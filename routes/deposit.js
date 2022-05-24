var express = require('express');
var router = express.Router();
const cors = require('cors');
var Deposit = require('../models/deposit')
var User = require('../models/user')
var Ref = require('../models/ref')

const bodyParser = require('body-parser');
const user = require('../models/user');

router.post('/create', cors(), function(req, res, next) {
    var {
        userId,
        selectedCoin,
        amount,
        methodCurrency,
        plan,
        amountInMngf,
        interestRate,
        amountWillBeRecieved
    } = req.body;
    Ref.findOne({userId: userId,didInvest: false},(error,data) => {
        if(!data){
            return;
        }
        console.log("ref data: ",data)
        // User.findByIdAndUpdate({_id: data.referencedByUserId},(_error,_data) => {
        //     console.log("HEREEE");
        //     _data.balances.MNGF = _data.balances.MNGF + 10;
        //     _data.save();
        // })
    
        User.findByIdAndUpdate({_id: data.referencedByUserId},{"$inc":{"balances.MNGF": 10}}).then(result => {
            result.balances.MNGF = result.balances.MNGF + 10; 
            result.save();
            console.log(result);
        })
    })
    Ref.updateMany({userId: userId},{"$set":{"didInvest": true}}).then(result => {
        console.log(result)
    })
    
    var date = new Date(this.valueOf());
        
    var date = new Date();
    if(plan == "30-days"){
        date.setDate(date.getDate() + 30);
    }
    else if(plan == "60-days"){
        date.setDate(date.getDate() + 60);
    }
    else if(plan == "90-days"){
        date.setDate(date.getDate() + 90);
    }

    const deposit = new Deposit({
        userId: userId,
        selectedCoin: selectedCoin,
        amount: amount,
        methodCurrency: methodCurrency,
        plan: plan,
        interestRate: interestRate,
        endDate: date,
        amountInMngf: amountInMngf,
        amountWillBeRecieved: amountWillBeRecieved,
        status: "ongoing"

    }); 
    deposit
        .save().then(result => {
            res.send(result)
        })
    User.findOne({_id: userId},(error,data) => {
        switch(selectedCoin){
            case 'BTC':
                data.balances.BTC = data.balances.BTC - amount;
                break;
                case 'USDT':
                data.balances.USDT = data.balances.USDT - amount;
                break;
                case 'ETH':
                    data.balances.ETH = data.balances.ETH - amount;
                    break;
                    case 'LTC':
                        data.balances.LTC = data.balances.LTC - amount;
                        break;
                
        }
        data.save();
    })
});

router.post('/getAll', cors(), function(req, res, next) {
    function treatAsUTC(date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }
    
    function daysBetween(startDate, endDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
    }
    
    console.log("get deposit")
    var {
        userId
    } = req.body;
    
    Deposit.find({
        userId: userId
    }, (error, data) => {
        if (error) {
            console.log(error)
            res.json({
                "msg": "error-occured"
            })
        }
        if(data) {
            var today = new Date();
            var temp = []
            // var temp = data;
            for (let i = 0; i < data.length; i++) {
                var tempObject = {}
               tempObject.daysLeft = Math.floor(daysBetween(today,data[i].endDate));
               tempObject.data = data[i]
               temp.push(tempObject);
              }
            res.send(temp);
        }
        else {
            res.json({
                "msg": "no-deposit"
            })
        }
    })
})

//Calculate total earnings
router.post('/calculateEarnings', cors(), function(req, res, next) {
    function treatAsUTC(date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }
    
    function daysBetween(startDate, endDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
    }


    console.log("Calculating total earnings...");
    var {
        userId,
    } = req.body;
    var today = new Date();


    Deposit.find({userId: userId},(error,data) => {
      if(error){
          res.json({msg:"error-occured"});
          return;
      }
      else{
        if(!data){
            res.json({totalEarning: 0,totalPercent: 0,totalDeposit:0,totalReceive: 0})

        }
        var totalEarning = 0;
        var totalDeposit = 0;
        var totalReceive = 0;
        let days = 0;
        let rate = 0;
        var totalPercent = 0;
        for (let i = 0; i < data.length; i++) {
            
            switch(data[i].plan){
                case "30-days":
                days = 30;
                rate = 5;
                break;
                case "60-days":
                days = 60;
                rate = 15;
                break;
                case "90-days":
                days = 90;
                rate = 30;
                break;
                default:
                    break;
            }
            let daysLeft = Math.floor(daysBetween(today,data[i].endDate));
            totalEarning += ((days-daysLeft) * (data[i].amountWillBeRecieved - data[i].amountInMngf)/days);
            totalPercent += rate*((days-daysLeft)/days);
            totalDeposit += data[i].amountInMngf;
            totalReceive += data[i].amountWillBeRecieved - data[i].amountInMngf
            
          }
          totalPercent = totalPercent / data.length
          res.json({totalEarning: totalEarning.toFixed(2),totalPercent: totalPercent.toFixed(2),totalDeposit: totalDeposit.toFixed(2),totalReceive: totalReceive.toFixed(2)})
              }
    })
});


//Cancel Deposit
router.post('/cancelDeposit', cors(), function(req, res, next) {

    var {
        depositId,
    } = req.body;
    console.log(depositId);
    Deposit.findByIdAndDelete(depositId).clone().then(result => {
        const coinName = result.selectedCoin
        switch(coinName){
            case "BTC":
                User.updateOne({_id: result.userId},{$inc: {"balances.BTC": result.amount}}).then(result1 => {
                    console.log(result1)
                }).then(_result => {
                    res.send({msg: "success"})
                })
                break;
                case "ETH":
                    User.updateOne({_id: result.userId},{$inc: {"balances.ETH": result.amount}}).then(result1 => {
                        console.log(result1)
                    }).then(_result => {
                        res.send({msg: "success"})
                    })
                    break;
                    case "USDT":
                        User.updateOne({_id: result.userId},{$inc: {"balances.USDT": result.amount}}).then(result1 => {
                            console.log(result1)
                        }).then(_result => {
                            res.send({msg: "success"})
                        })
                        break;
                        case "LTC":
                            User.updateOne({_id: result.userId},{$inc: {"balances.LTC": result.amount}}).then(result1 => {
                                console.log(result1)
                            }).then(_result => {
                                res.send({msg: "success"})
                            })
                            break;
                                                
        }
      
    })
   
});
module.exports = router;
var express = require('express');
var router = express.Router();
const cors = require('cors');
var Deposit = require('../models/deposit')
var User = require('../models/user')
var Withdrawal = require('../models/withdrawal')
var LastDeposits = require('../models/last_deposits')
var Coin = require('../models/coin')


const bodyParser = require('body-parser');


router.post('/getUsers', [cors()], function(req, res, next) { 
const {secret} = req.body;
if(secret != "6657d05e-0b66-4462-a367-3eaaf26e5ffb"){
    res.send({msg: "unauthorized"})
    return;
}
User.find({},(error,data) => {
    res.send({data: data,userCount: data.length});
}).sort({createdAt: -1})
});

router.post('/getUser', [cors()], function(req, res, next) { 
    const {secret,userId} = req.body;
    if(secret != "6657d05e-0b66-4462-a367-3eaaf26e5ffb"){
        res.send({msg: "unauthorized"})
        return;
    }
    User.find({_id: userId},(error,data) => {
        res.send(data);
    })
    });

router.post('/getDeposits', [cors()], function(req, res, next) {
    const {secret} = req.body;
if(secret != "6657d05e-0b66-4462-a367-3eaaf26e5ffb"){
    res.send({msg: "unauthorized"})
    return;
}
    function treatAsUTC(date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }
    
    function daysBetween(startDate, endDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
    }
    
    Deposit.find({}, (error, data) => {
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

router.post('/getWithdrawals', [cors()], function(req, res, next) { 
    const {secret} = req.body;
    if(secret != "6657d05e-0b66-4462-a367-3eaaf26e5ffb"){
        res.send({msg: "unauthorized"})
        return;
    }
    Withdrawal.find({},(error,data) => {
        res.send(data);
    })
    });
    router.post('/getLastDeposits', [cors()], function(req, res, next) { 
        LastDeposits.find({},(error,data) => {
            res.send(data);
        }).sort({_id: -1})
        });


    router.post('/createDeposit', [cors()], async function(req, res, next) { 
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
        const {secret} = req.body;
        if(secret != "6657d05e-0b66-4462-a367-3eaaf26e5ffb"){
            res.send({msg: "unauthorized"})
            return;
        }
        let x = await LastDeposits.findOne({}).sort({_id: 1});
await x.remove();
        const axios = require('axios');
        //random mngf 
        const rndInt = randomIntFromInterval(1, 6)
        var randomMngf;
        if(rndInt == 1 || rndInt == 2 || rndInt == 3){
            randomMngf = randomIntFromInterval(200,1000)
        }
        else if(rndInt == 4 || rndInt == 5){
            randomMngf = randomIntFromInterval(1000,5000)
        }
        else {
            randomMngf = randomIntFromInterval(5000,20000)
        }


axios
  .get('https://rp.burakgarci.net/api.php')
  .then(ress => ress).then(r => {
 const deposit = new LastDeposits({
            userName: r.data.tam_isim,
            amount: randomMngf,
            date: new Date()
        })
        deposit.save().then(result => {
          res.send(result);
        })
  })
  .catch(error => {
    console.error(error);
  });

       
        });

        router.post('/changeCoinPrice', [cors()], function(req, res, next) { 
            function randomIntFromInterval(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min)
              }
            const {secret} = req.body;
            if(secret != "6657d05e-0b66-4462-a367-3eaaf26e5ffb"){
                res.send({msg: "unauthorized"})
                return;
            }
            //random mngf 
            const rndInt = randomIntFromInterval(1, 3)
            var randomMngf;
            if(rndInt == 1 || rndInt == 2){
                randomMngf = randomIntFromInterval(980,999);
                randomMngf = randomMngf/1000

            }
            else{
                randomMngf = randomIntFromInterval(100,102);
                randomMngf = randomMngf/100
            }

    
            Coin.findOne({
                coinName: "mngf"
            }, (error, data) => {
                if (error) {
                    console.log(error)
                    res.json({
                        "msg": "error-occured"
                    })
                }
                if(data) {
                    data.coinPrice = randomMngf;
                    data.save(function(){});
                    res.send(data);
                }
                else {
                    res.json({
                        "msg": "no-coin"
                    })
                }
            })
           
            });

module.exports = router;
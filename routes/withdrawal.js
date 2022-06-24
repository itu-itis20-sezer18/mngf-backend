var express = require('express');
var router = express.Router();
const cors = require('cors');
var Withdrawal = require('../models/withdrawal')
const bodyParser = require('body-parser')
const checkToken = require("./checkAuth")



router.post('/create', [cors(),checkToken], function(req, res, next) {
    console.log("here")
    var {
        userId,
        selectedCoin,
        amount,
        wallet
    } = req.body;
    var requestedAt = new Date();
    const withdrawal = new Withdrawal({
            userId: userId,
            selectedCoin: selectedCoin,
            amount: amount,
            methodCurrency: "USD",
            requestedAt: requestedAt,
            status: "New",
            wallet: wallet
        });
   
    
    withdrawal.save().then(result => {
            res.send(result)
        })
    

    

})


router.post('/getAll', [cors(),checkToken], function(req, res, next) {
    console.log("get deposit")
    var {
        userId,
    } = req.body;
    
    Withdrawal.find({
        userId: userId
    }, (error, data) => {
        if (error) {
            console.log(error)
            res.json({
                "msg": "error-occured"
            })
        }
        if(data) {
            res.send(data);
        }
        else {
            res.json({
                "msg": "no-withdrawal"
            })
        }
    })
})

//Approve withdrawal
router.post('/approve', [cors()], function(req, res, next) {
    var {
        withdrawalId,secret
    } = req.body;
    if(secret != "6657d05e-0b66-4462-a367-3eaaf26e5ffb"){
        return;
    }
    console.log(withdrawalId)

    Withdrawal.findById({
        _id: withdrawalId
    }, (error, data) => {
        console.log(data)
        if (error) {
            console.log(error)
            res.json({
                "msg": "error-occured"
            })
            return;
        }
        if(data) {
           data.status = "Approved";
           data.save().then(result => {
            res.send(result);
           });
           
        }
        else {
            res.json({
                "msg": "no-withdrawal"
            })
        }
    })
})
//Decline withdrawal
router.post('/decline', [cors()], function(req, res, next) {
    var {
        withdrawalId,secret
    } = req.body;
    if(secret != "6657d05e-0b66-4462-a367-3eaaf26e5ffb"){
        return;
    }
    console.log(withdrawalId)

    Withdrawal.findById({
        _id: withdrawalId
    }, (error, data) => {
        console.log(data)
        if (error) {
            console.log(error)
            res.json({
                "msg": "error-occured"
            })
        }
        if(data) {
           data.status = "Declined";
           data.save().then(result => {
            res.send(result);
           });
           
        }
        else {
            res.json({
                "msg": "no-withdrawal"
            })
        }
    })
})
module.exports = router
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
            status: "new",
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

module.exports = router
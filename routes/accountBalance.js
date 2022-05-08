var express = require('express');
var router = express.Router();
const cors = require('cors');
var User = require('../models/user')
const bodyParser = require('body-parser')
const Coinpayments = require('coinpayments');

router.post('/', cors(), function(req, res, next) {
    var {
        userWallet,
        balance,
        coin
    } = req.body;
    if(coin == "LTC"){
    User.findOne({"depositAddresses.LTC": userWallet},(error,data) => {
        data.balances.LTC = data.balances.LTC + balance;
        data.save().then(result => {
                                res.send(result)
                            })
      })
    }

    if(coin == "BTC"){
        User.findOne({"depositAddresses.BTC": userWallet},(error,data) => {
            data.balances.BTC = data.balances.BTC + balance;
            data.save().then(result => {
                                    res.send(result)
                                })
          })
        }

        if(coin == "ETH"){
            User.findOne({"depositAddresses.ETH": userWallet},(error,data) => {
                data.balances.ETH = data.balances.ETH + balance;
                data.save().then(result => {
                                        res.send(result)
                                    })
              })
            }
            if(coin == "USDT"){
                User.findOne({"depositAddresses.USDT": userWallet},(error,data) => {
                    data.balances.USDT = data.balances.USDT + balance;
                    data.save().then(result => {
                                            res.send(result)
                                        })
                  })
                }

})

module.exports = router
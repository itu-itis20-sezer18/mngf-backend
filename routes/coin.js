var express = require('express');
var router = express.Router();
const cors = require('cors');
var Coin = require('../models/coin')

const bodyParser = require('body-parser')

router.post('/create', cors(), function(req, res, next) {
    var {
        coinName,
        coinPrice
    } = req.body;

    const coin = new Coin({
        "coinName": coinName,
        "coinPrice": coinPrice

    }); 
    coin
        .save().then(result => {
            res.send(result)
        })
});

router.get('/getPrice', cors(), function(req, res, next) {
    
    Coin.find({
        coinName: "mngf"
    }, (error, data) => {
        if (error) {
            console.log(error)
            res.json({
                "msg": "error-occured"
            })
        }
        if(data) {
            res.send(data)
        }
        else {
            res.json({
                "msg": "no-coin"
            })
        }
    })
})

router.post('/setPrice', cors(), function(req, res, next) {
    var {
        coinName,
        coinPrice
    } = req.body;

    Coin.findOneAndUpdate({
        coinName: coinName
    }, (error, data) => {
        if (error) {
            console.log(error)
            res.json({
                "msg": "error-occured"
            })
        }
        if(data) {
            data.coinPrice = coinPrice;
            data.save(function(){});
            res.send(data);
        }
        else {
            res.json({
                "msg": "no-coin"
            })
        }
    })
})
module.exports = router;
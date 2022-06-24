var express = require('express');
var router = express.Router();
const cors = require('cors');
var User = require('../models/user')
const bodyParser = require('body-parser')
const Coinpayments = require('coinpayments');
var Ref = require('../models/ref')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const checkToken = require("./checkAuth")


router.post('/signUp', cors(), function(req, res, next) {
    var {
        mail,
        password,
        firstName,
        lastName,
        phoneNumber,
        balance,
        country,
        imageUrl,
        ref,
        countryPhoneCode,
        wallet
    } = req.body;
    console.log(mail);
    User.findOne({
        email: mail
    }, (error, data) => {
        if (error) {
            console.log(error)
        }
        if(data){
            res.json({
                "msg": "taken-email"
            })
            console.log("mail taken")
            return
        }
        
        else{
            console.log("checking phone")
            User.findOne({
                phoneNumber: countryPhoneCode + phoneNumber
            }, (errorr, dataa) => {
                if (errorr) {
                    console.log(errorr)
                }
                if (dataa){
                    res.json({
                        "msg": "taken-number"
                    })
                }
                
                if (dataa == null || dataa == undefined) {
                    if (ref == "") {
                        ref = "natural"
                    }
                    //Create addresses
                    var CoinpaymentsCredentials = {
                        key: "67a595c41dc9edc36d9fa6ca8322cdbec0a3d8e8446c69693be16763e53d408e",
                        secret: "760e8A427475287f32b2f9f4d5b0410913c0fe3D3E01b02Ff3352A4D65c38471"
                      }
                      const client = new Coinpayments(credentials= CoinpaymentsCredentials)
                    
                      var dict = new Object();
                    
                     var CoinpaymentsGetCallbackAddressOpts =  {
                        currency: "BTC"
                      }
                      let callBack = client.getCallbackAddress(options= CoinpaymentsGetCallbackAddressOpts);
                      callBack.then(function(result) {
                        console.log(result) // "Some User token"
                        dict["BTC"] = result["address"]
                     })
                    
                     var CoinpaymentsGetCallbackAddressOpts =  {
                        currency: "LTC"
                      }
                      callBack = client.getCallbackAddress(options= CoinpaymentsGetCallbackAddressOpts);
                      callBack.then(function(result) {
                        console.log(result) // "Some User token"
                        dict["LTC"] = result["address"]
                     })
                     var CoinpaymentsGetCallbackAddressOpts =  {
                        currency: "ETH"
                      }
                      callBack = client.getCallbackAddress(options= CoinpaymentsGetCallbackAddressOpts);
                      callBack.then(function(result) {
                        console.log(result) // "Some User token"
                        dict["ETH"] = result["address"]
                     })
                     var CoinpaymentsGetCallbackAddressOpts =  {
                        currency: "USDT"
                      }
                      callBack = client.getCallbackAddress(options= CoinpaymentsGetCallbackAddressOpts);
                      callBack.then(function(result) {
                        console.log(result) // "Some User token"
                        dict["USDT"] = result["address"]
                     })
                    
                     
                     setTimeout(print,3000);
                     function print(){
                        var count = Object.keys(dict).length;
                        while(count != 4){
                            count = Object.keys(dict).length;
                            continue;
                        }
                        phoneNumber = countryPhoneCode+phoneNumber;

                         console.log("Awaiting...")
                         const user = new User({
                            email: mail,
                            password: password,
                            firstName: firstName,
                            lastName: lastName,
                            phoneNumber: phoneNumber,
                            balance: balance,
                            country: country,
                            imageUrl: imageUrl,                  
                            ref: ref,
                            wallet: "temp",
                            depositAddresses: dict,
                            createdAt: new Date(),
                            balances: {
                                MNGF: 0,
                                BTC: 0,
                                LTC: 0,
                                ETH: 0,
                                USDT: 0
                            } 
                        });
                        user
                            .save().then(result => {
                                if(result.ref != ""){
                                    const ref = new Ref({
                                        userId: result._id,
                                        referencedByUserId: result.ref,
                                        refDate: new Date(),
                                        didInvest: false
                                    })
                                    ref.save();
                                }
                                const accessToken = jwt.sign({id: result._id.toString()},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '2d' })
                                res.send({data:result,token: accessToken})
                            })
                     }
                    
                }
            })
        }




    })
});



//Sign in
router.post('/signIn', cors(), function(req, res, next) {
    var {
        mail,
        password,
    } = req.body;
    
    User.findOne({
        email: mail,
        password: password
    }, (error, data) => {
        if (error) {
            console.log(error)
            res.json({
                "msg": "error-occured"
            })
        }
        if(data) {
            console.log(data._id)
            const accessToken = jwt.sign({id: data._id.toString()},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '2d' })
            res.send({data: data,token: accessToken});
        }
        else {
            res.json({
                "msg": "no-user"
            })
        }
    })


});

//Sign in
router.post('/signInWithId', [cors(),checkToken], function(req, res, next) {
    var {
        userId
    } = req.body;
    
    User.findOne({
        _id: userId,
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
                "msg": "no-user"
            })
        }
    })


});


module.exports = router;
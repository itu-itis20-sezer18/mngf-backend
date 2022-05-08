var express = require('express');
var router = express.Router();
const cors = require('cors');
var Ref = require('../models/ref')
const bodyParser = require('body-parser')


router.post('/getRefs', cors(), function(req, res, next) {

    var {
        userId
    } = req.body;
    Ref.find({referencedByUserId: userId},(error,data) => {
        if(data){
            var activeRefs = 0;
            var passiveRefs = 0;
            for (let i = 0; i < data.length; i++) {
                if(data[i].didInvest){
                    activeRefs++;
                }
                else{
                    passiveRefs++;
                }
              }
              res.json({refEarnings: activeRefs*10,activeRefs: activeRefs,passiveRefs:passiveRefs,totalRefs: activeRefs+passiveRefs})
        }
        else{
            res.json({msg: "no-refs"})
        }
    })
  

})

module.exports = router
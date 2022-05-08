var express = require('express');
var router = express.Router();
const cors = require('cors');
var Pw = require('../models/pwRecovery')
const bodyParser = require('body-parser')
const crypto = require('crypto');

router.post('/create', cors(), function(req, res, next) {
    function sendMail(receipent,code){
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey("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")
        const msg = {
          to: receipent, // Change to your recipient
          from: {
            email: 'miningfy@protonmail.com',
            name: 'Miningfy'
        }, 
          subject: 'Parola Sıfırlama',
          html: `<strong>Aşağıdaki bağlantıdan parolanızı sıfırlayabilirsiniz. <br><br><a>http://localhost:4000/reset-password/${code}</strong>`,
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })
    }
    function uuidv4() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    const code = uuidv4()
    var {
        mail
    } = req.body;
    Pw.findOne({email:mail},(error,data) => {
        if(!data){
          
            const pw = new Pw({
                email: mail,
                generatedCode: code
            })
            pw.save().then(result => {
                sendMail(mail,code);
                res.send(result)
            })
        }
        else{
            Pw.findByIdAndDelete(data._id).then(result => {
                const pw = new Pw({
                    email: mail,
                    generatedCode: code
                })
                pw.save().then(resultt => {
                    sendMail(mail,code);
                    res.send(resultt)
                })
            })
        }
    })
  

})

router.post('/getCode', cors(), function(req, res, next) {

    var {
        code
    } = req.body;
    Pw.findOne({generatedCode:code},(error,data) => {
        if(data){
            res.send(data)
        }
        else{
            res.json({msg: "no-code"})
        }
    })
  

})

module.exports = router
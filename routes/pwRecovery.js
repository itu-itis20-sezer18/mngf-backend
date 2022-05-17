var express = require('express');
var router = express.Router();
const cors = require('cors');
var Pw = require('../models/pwRecovery')
var User = require('../models/user')
const bodyParser = require('body-parser')
const crypto = require('crypto');
const pwRecovery = require('../models/pwRecovery');

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
          html: "<!DOCTYPE HTML PUBLIC '-//W3C//DTD XHTML 1.0 Transitional //EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml' xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'><head><!--[if gte mso 9]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->  <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>  <meta name='viewport' content='width=device-width, initial-scale=1.0'>  <meta name='x-apple-disable-message-reformatting'>  <!--[if !mso]><!--><meta http-equiv='X-UA-Compatible' content='IE=edge'><!--<![endif]-->  <title></title>      <style type='text/css'>      @media only screen and (min-width: 520px) {  .u-row {    width: 500px !important;  }  .u-row .u-col {    vertical-align: top;  }  .u-row .u-col-100 {    width: 500px !important;  }}@media (max-width: 520px) {  .u-row-container {    max-width: 100% !important;    padding-left: 0px !important;    padding-right: 0px !important;  }  .u-row .u-col {    min-width: 320px !important;    max-width: 100% !important;    display: block !important;  }  .u-row {    width: calc(100% - 40px) !important;  }  .u-col {    width: 100% !important;  }  .u-col > div {    margin: 0 auto;  }}body {  margin: 0;  padding: 0;}table,tr,td {  vertical-align: top;  border-collapse: collapse;}p {  margin: 0;}.ie-container table,.mso-container table {  table-layout: fixed;}* {  line-height: inherit;}a[x-apple-data-detectors='true'] {  color: inherit !important;  text-decoration: none !important;}table, td { color: #000000; } </style>    </head><body class='clean-body u_body' style='margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000'>  <!--[if IE]><div class='ie-container'><![endif]-->  <!--[if mso]><div class='mso-container'><![endif]-->  <table style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%' cellpadding='0' cellspacing='0'>  <tbody>  <tr style='vertical-align: top'>    <td style='word-break: break-word;border-collapse: collapse !important;vertical-align: top'>    <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td align='center' style='background-color: #e7e7e7;'><![endif]-->    <div class='u-row-container' style='padding: 0px;background-color: transparent'>  <div class='u-row' style='Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'>    <div style='border-collapse: collapse;display: table;width: 100%;background-color: transparent;'>      <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding: 0px;background-color: transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:500px;'><tr style='background-color: transparent;'><![endif]-->      <!--[if (mso)|(IE)]><td align='center' width='500' style='width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;' valign='top'><![endif]--><div class='u-col u-col-100' style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'>  <div style='width: 100% !important;'>  <!--[if (!mso)&(!IE)]><!--><div style='padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;'><!--<![endif]-->  <table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>  <tbody>    <tr>      <td style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;' align='left'>          <h1 style='margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;'>    Miningfy Parola Sıfırlama  </h1>      </td>    </tr>  </tbody></table><table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>  <tbody>    <tr>      <td style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;' align='left'>          <table height='0px' align='center' border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%'>    <tbody>      <tr style='vertical-align: top'>        <td style='word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%'>          <span>&#160;</span>        </td>      </tr>    </tbody>  </table>      </td>    </tr>  </tbody></table><table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>  <tbody>    <tr>      <td style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;' align='left'>          <div style='line-height: 140%; text-align: left; word-wrap: break-word;'>    <p style='font-size: 14px; line-height: 140%;'>Aşağıdaki bağlantıdan parolanızı sıfırlayabilirsiniz.</p>  </div>      </td>    </tr>  </tbody></table><table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>  <tbody>    <tr>      <td style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;' align='left'>          <div style='line-height: 140%; text-align: left; word-wrap: break-word;'>    <p style='font-size: 14px; line-height: 140%;'>https://miningfy.net/reset?code="+ code+ "</p>  </div>      </td>    </tr>  </tbody></table><table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>  <tbody>    <tr>      <td style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;' align='left'>          <table height='0px' align='center' border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%'>    <tbody>      <tr style='vertical-align: top'>        <td style='word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%'>          <span>&#160;</span>        </td>      </tr>    </tbody>  </table>      </td>    </tr>  </tbody></table><table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>  <tbody>    <tr>      <td style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;' align='left'>        <table width='100%' cellpadding='0' cellspacing='0' border='0'>  <tr>    <td style='padding-right: 0px;padding-left: 0px;' align='center'>            <img align='center' border='0' src='images/image-1.png' alt='' title='' style='outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 480px;' width='480'/>          </td>  </tr></table>      </td>    </tr>  </tbody></table>  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->  </div></div><!--[if (mso)|(IE)]></td><![endif]-->      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->    </div>  </div></div>    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->    </td>  </tr>  </tbody>  </table>  <!--[if mso]></div><![endif]-->  <!--[if IE]></div><![endif]--></body></html>"
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
                generatedCode: code,
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
            res.json({msg: "successfull"})
        }
        else{
            res.json({msg: "no-code"})
        }
    })
  

})


router.post('/savePwd', cors(), function(req, res, next) {
    var {
        code,
        newPassword
    } = req.body;
    pwRecovery.findOneAndDelete({generatedCode:code},(error,data) => {
        console.log("data: ",data.email)
        if(data){
            console.log("girdim!")
            User.findOne({email: data.email},(error2,data2) => {
                console.log("data2: ",data2)
                data2.password = newPassword;
                data2.save();
            })
            res.json({msg: "successfull"})
        }
        else{
            res.json({msg: "no-code"})
        }
    })
  

})
module.exports = router
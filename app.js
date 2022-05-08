const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const createError = require('http-errors');


app.options('*', cors());
app.use(cors());

app.use('/auth',bodyParser.urlencoded({extended:false}))
app.use('/auth',bodyParser.json())
app.use('/deposit',bodyParser.urlencoded({extended:false}))
app.use('/deposit',bodyParser.json())
app.use('/accountBalance',bodyParser.urlencoded({extended:false}))
app.use('/accountBalance',bodyParser.json())
app.use('/withdrawal',bodyParser.urlencoded({extended:false}))
app.use('/withdrawal',bodyParser.json())
app.use('/pwRecovery',bodyParser.urlencoded({extended:false}))
app.use('/pwRecovery',bodyParser.json())
app.use('/coin',bodyParser.urlencoded({extended:false}))
app.use('/coin',bodyParser.json())
app.use('/ref',bodyParser.urlencoded({extended:false}))
app.use('/ref',bodyParser.json())
app.use(express.json())


//Routers
const authRouter = require('./routes/auth')
app.use('/auth',authRouter );
const depositRouter = require('./routes/deposit')
app.use('/deposit',depositRouter );
const accountBalanceRouter = require('./routes/accountBalance')
app.use('/accountBalance',accountBalanceRouter );
const withdrawalRouter = require('./routes/withdrawal')
app.use('/withdrawal',withdrawalRouter );
const pwRecoveryRouter = require('./routes/pwRecovery')
app.use('/pwRecovery',pwRecoveryRouter );
const coinRouter = require('./routes/coin')
app.use('/coin',coinRouter );
const refRouter = require('./routes/ref')
app.use('/ref',refRouter );


mongoose.connect("mongodb+srv://karavangezer1:J4AUsFkBru@cluster0.hozdl.mongodb.net/test?authSource=admin&replicaSet=atlas-tcqpsg-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get('/',  function(req, res) {
  res.json({
    "msg": "successfull"
  })
});

app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.status(err.status || 500);
res.json({
  message: err.message,
  error: err
});
  });
  


  app.options('*', cors());
  app.use(cors());


  const port = 4000;
  server.listen(port, () => console.log(`running @${port}`));
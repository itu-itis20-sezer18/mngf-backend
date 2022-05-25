module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.send({msg: "unauthorized"})
     
    const jwt = require('jsonwebtoken')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.send({msg: "unauthorized"})
      next()
    })
  }
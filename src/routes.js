const express = require('express')
const router = express.Router()

router.get('/webhook', (req, res) => {
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']
  if (token === process.env.VERIFY_TOKEN) {
    res.status(200).send(challenge)
  } else {
    res.sendStatus(403)
  }
})

router.post('/webhook', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  res.sendStatus(200)
})

module.exports = router

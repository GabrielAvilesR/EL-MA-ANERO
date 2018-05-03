const http = require('http')
const port = process.env.PORT || 9000
const ip = process.env.IP || '0.0.0.0'
const express = require('express')
const schedule= require('node-schedule')
const axios = require('axios')
import verificationReminder from './custom/verificationReminder'

const app = express()
const server = http.createServer(app)



//DESPERTANDO A KINTOS SHINGAO
schedule.scheduleJob('0 */10 * * * *', () => {
    axios.get(`http://kintos-api.herokuapp.com/`)
        .then((res) => {
            console.log('despertando a kintos')
        })
        .catch((err) => {
            console.log('despertando a kintos')
        })
    axios.get(`https://lab-web-ene-2018.herokuapp.com/`)
        .then((res) => {
            console.log('despertando a elections')
        })
        .catch((err) => {
            console.log('despertando a elections')
        })
})




setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d', ip, port)
  })
})
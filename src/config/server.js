

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const server  = require('http').Server(app)
const allowCors = require('./cors')
const queryParser = require('express-query-int')
const path = require('path');
const cors = require('cors');



app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb', extended: true }))

app.use(cors());
app.options('*', cors());
//server.use(allowCors)
app.use(queryParser())

/*
server.use(express.static(path.join(__dirname, 'build')));
server.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});*/

server.listen(process.env.PORT || 3010, () => {
    console.log(`BACKEND is running on port ${process.env.PORT || 3010}.`)
})

module.exports = app
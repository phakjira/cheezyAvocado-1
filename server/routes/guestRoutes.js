const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const io = require('../config/server').io

// setup guest router
const router = express.Router();
router.use(morgan('dev'));


// test route
router.get('/', (req, res) => {
    res.send('this is from guest file!');
});

// getBillPayment route
router.get('/getBillPayments', (req, res, next) => {
    const customerId = req.query.customerId;
    //query db
    res.send('db query results');
});

//openRobotLocker
//version 1,, use HTTP
router.post('/openRobotLocker', (req, res, next) => {
    const openLockerStatus = req.query.openLockerStatus;
    console.log(openLockerStatus);
    if(openLockerStatus=1) { //receive from frontend
    res.send(1); //send to arduino
    //1=openlocker, or call arduino function directly but let robot do is better
    //robot set 0 for locked locker and 1 for opened locker in arduino
    }
})

//openRobotLocker
//version2 use Socket
io.on('connection', function (socket) {
    console.log('User has connected to guestRoutes');
    //ON Events
    socket.on('openLockerStatus' , openLockerStatus => { //wait from frontend(receive from page.html(mockup))
        io.emit('openLockerStatusToRobot', openLockerStatus); //emit to robot(have to change)
        console.log(openLockerStatus);
    });
    //End ON Events
});


module.exports = router;



// PLS DONT DELELT , how to receive parameter from index.js
// var server;
// router.get('/receiveParameter', function(req, res) {
//     var getParameter = req.parameter;
//     server=getParameter.param;
//     res.send(server)
//   });
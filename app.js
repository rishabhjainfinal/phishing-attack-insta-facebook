const express = require('express');
const path = require('path');
const helmet = require('helmet')
const cors = require('cors')
const app = express();
const api = require('./api/api')
require('dotenv').config()

let port = process.env.PORT || 80;

app.locals.basedir = __dirname;

// app.use(function(req, res, next) {
//     console.log(req.url)
//     next();
// })

// ############ middlewares ################

app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static(__dirname + '/public'));
app.use('/api', api)
app.use(cors({
    origin: [process.env.SITE_NAME1,process.env.SITE_NAME2]
}))
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));

// #########################################



// routing start here  ####################################################################################
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/landing.html'))
})
app.get('/successStories', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views//successStories.html'))
})
app.get('/instagram', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/instagram.html'))
})
app.get('/facebook', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/facebook.html'))
})
app.get('/success', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/sucess_page.html'))
})
app.get('/admin-ri', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/admin-html.html'))
})


//The 404 Route final################
app.route('*')
    .get((req, res) => {
        console.log('404 page open');
        res.status(404).send(`<h1>Page not found 404 </h1>`);
    })
    .post((req, res) => {
        console.log('404 page open');
        res.status(404).send(`<h1>Page not found 404 </h1>`);
    })

//startListingOnGivenPort
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})

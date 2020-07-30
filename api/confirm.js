const fetch = require("node-fetch");
const { ConnectionStates } = require("mongoose");
// const puppeteer = require('puppeteer');

async function userid(req, res, username) {
    myHeaders = {
        "Cookie": `ig_did=3E5A8767-4CB7-4F76-97ED-210827ED5A3E; csrftoken=1OT3OxqnpLXFKWUn8kcN1zJzI9hjad9l; mid=XwvMpgAEAAGbxhNcHUvtCvt2UhHr; rur=PRN; urlgen=\"{\\\"103.40.66.82\\\": 59162}:1jyFLM:UeR-LwrgsxYvSV4YfBKkk08OU1w\"`
    };
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let url = `https://www.instagram.com/${username}/?__a=1`
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            if (result == '{}') {
                res.status(404).send(false)
                console.log('this+is+not')
            } else {
                res.status(200).send(true)
                console.log('this+is+working')
            }
        })
        .catch(error => {
            console.log('error', error);
            res.status(404).send(false)
        });
}


async function userid2(username, res) {
    let url = `https://www.instagram.com/${username}/?hl=en`
    fetch(url)
        .then(response => {
            // console.log(response)
            if (response.status == 404) {
                res.status(404).send(false)
                console.log('this+is+not')
            } else if (response.status == 200) {
                res.status(200).send(true)
                console.log('this+is+working')
            }
        })
        .catch(error => {
            console.log('error', error);
            res.status(404).send(false)
        });
}


async function login(username, password, res) {
    let aim_url = "https://www.instagram.com/accounts/onetap/?next=%2F";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com');
    await page.waitForSelector('input')
    await page.type('input[name="username"]', username)
    await page.type('input[name="password"]', password)
    await page.click("button[type='submit']")
    await page.waitFor(500)
    if (page.url() == 'https://www.instagram.com/') {
        try {
            await page.waitForSelector("#slfErrorAlert", { timeout: 3000 })
            console.log('error in login')
            await res.status(404)
            await res.send('error')
                // here send response to server
        } catch (error) {
            if (page.url() == "https://www.instagram.com/accounts/onetap/?next=%2F") {
                console.log("login sucessful")
                res.status(200)
                res.send('sucess')
                    // here send response to server
            }
        }
    }
    await browser.close();
};



module.exports = {
    userid: userid2,
    account: login
}
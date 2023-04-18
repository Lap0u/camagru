async function verifyCredentials (newUser) {
  console.log("post user")
  //doit send le password confirm
  fetch('http://localhost:4000/login', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'content-type': 'application/json' },
  })
    .then(response => {
      if (response.ok === true) {
        return response.json()
      } else if (response.status === 400) {
        return response.json().then(data => {
          throw new Error(data.message)
        })
      }
    })
    .then(user => console.log(user))
    // .then(window.location.href = "./camagru.html")
    .catch(error => {
      alert(error)
    })
}

function checkLogin () {
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value


  const user = {
    username: username,
    password: password
  }
  verifyCredentials(user)
}

document.getElementById("form-login").addEventListener('submit', event => {
  event.preventDefault()
  checkLogin()
})
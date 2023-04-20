function checkUserName (username) {
  let regex = /^[a-zA-Z0-9]{4,10}$/
  if (regex.test(username) === false) {
    alert('Username must be between 4 and 10 characters long and can contain only letters and numbers')
    return false
  }
  return true
}

function checkEmail (email) {
  let regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
  if (regex.test(email) === false) {
    alert('The email address must contain only alphanumeric characters, periods, underscores, and hyphens before the @ symbol, and the domain name must have at least two characters before the period and between two to four characters after the period.')
    return false
  }
  return true
}

function checkPassword (password, passwordConfirm) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
  if (regex.test(password) === false) {
    alert('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number')
    return false
  }
  if (password !== passwordConfirm) {
    alert('Passwords do not match')
    return false
  }
  return true
}

async function postNewUser (newUser) {
  console.log("post user")
  //doit send le password confirm
  fetch('http://localhost:4000/users', {
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
    .then(user => {
      console.log(user)
      localStorage.setItem('username', user.username)
      localStorage.setItem('token', user.token)
      window.location.href = "./camagru.html"
    })
    .catch(error => {
      alert(error)
    })
}

function createUser (username, email, password) {
  let newUser = {
    username: username,
    email: email,
    password: password
  }
  return newUser
}

function checkSignup () {

  let username = document.getElementById('username').value
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  let passwordConfirm = document.getElementById('password-confirm').value

  if (checkUserName(username) === false || checkEmail(email) === false || checkPassword(password, passwordConfirm) === false) { return }
  let newUser = createUser(username, email, password)
  postNewUser(newUser, passwordConfirm)
}

document.getElementById("form-signup").addEventListener('submit', event => {
  event.preventDefault()
  checkSignup()
})

function checkLogin () {
  var username = document.getElementById('username').value
  var password = document.getElementById('password').value

  if (username === 'admin' && password === 'admin') {
    window.location.href = "./camagru.html";
    console.log('Login success')
  } else {
    alert('Login fail')
  }
}

document.getElementById("form-login").addEventListener('submit', function () { checkLogin() })
document.getElementById('webcam-button').addEventListener('click', getWebcam)
document.getElementById('upload-image').addEventListener('click', uploadImage)
document.getElementById('save-picture').addEventListener('click', savePicture)
document.getElementById('input_file').addEventListener('change', changeImage)
document.getElementById('foreground-image').addEventListener('mousedown', dragImage)
document.getElementById('logout-icon').addEventListener('click', logout)

const images = [
  '../assets/edits/chowchow.png',
  '../assets/edits/ane.png',
  '../assets/edits/ecureuil.png',
  '../assets/edits/koala.png',
  '../assets/edits/loutre.png',
]

createLastUploadGallery()
createEditGallery()
checkLogin()

function logout () {
  localStorage.clear()
  window.location.href = "./index.html"
}

function checkLogin () {

  console.log('checkLogin()')
  const e = document.getElementById('username-div')
  e.innerHTML = "Hello " + localStorage.getItem('username')
}

function dragImage (e) {
  poster = document.getElementById('webcam-screen')
  e.preventDefault()
  startPosX = e.clientX
  startPosY = e.clientY

  document.addEventListener('mousemove', mouseMove)

  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', mouseMove)
  })
}

function mouseMove (e) {
  addedImage = document.getElementById('foreground-image')
  poster = document.getElementById('webcam-screen').getBoundingClientRect()
  console.log('poster', poster)
  // calculate the new position
  var x = e.clientX - poster.left //x position within the element.
  var y = e.clientY - poster.top
  console.log('x', x)
  console.log('y', y)
  if (x < 0 || y < 0 || x > poster.width || y > poster.height)
    return

  newPosX = startPosX - e.clientX
  newPosY = startPosY - e.clientY

  // with each move we also want to update the start X and Y
  startPosX = e.clientX
  startPosY = e.clientY

  // set the element's new position:
  addedImage.style.top = (addedImage.offsetTop - newPosY) + "px"
  addedImage.style.left = (addedImage.offsetLeft - newPosX) + "px"
}

function savePicture () {
  console.log('savePicture()')
}

function mainImage (event) {
  const image = document.getElementById('foreground-image')
  image.removeAttribute('hidden')
  if (event.target.src === image.src) {
    image.setAttribute('hidden', true)
  }
  else {
    image.src = event.target.src
  }
  console.log('event', event)
  console.log('mainImage()')
}

function createLastUploadGallery () {
  const gallery = document.getElementById('gallery-images')
  for (i = 0; i < 8; i++) {
    const img = document.createElement('img')
    img.src = "../assets/empty_img.jpg"
    img.className = "gallery-img"
    gallery.appendChild(img)
  }
}

function createEditGallery () {
  const gallery = document.getElementById('add-images')
  for (img of images) {
    const imgElement = document.createElement('img')
    imgElement.src = img
    imgElement.className = "add-img"
    imgElement.addEventListener('click', mainImage)
    gallery.appendChild(imgElement)
  }
}

function changeImage () {
  const input = document.getElementById('input_file')
  const video = document.getElementById('webcam-screen')
  const file = input.files[0]
  console.log('changeImage()')
  video.srcObject = null
  //read the file and replace the poster
  if (file['type'].split('/')[0] != 'image') {
    alert('Please select an image file')
    return
  }
  var fr = new FileReader()
  fr.onload = function (e) {
    video.poster = fr.result
  }
  fr.readAsDataURL(file)
}

function uploadImage () {
  document.getElementById('input_file').value = null
  document.getElementById('input_file').click()
}

async function getWebcam () {
  let stream = null
  console.log('getWebcam()')

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: { ideal: 650 },
        height: { ideal: 650 }
      }
    })
    const video = document.getElementById('webcam-screen')
    video.srcObject = stream
    video.onloadedmetadata = () => video.play()
  } catch (err) {
    alert('Please allow access to your webcam or upload a picture')
  }
}

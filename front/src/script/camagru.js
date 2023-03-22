document.getElementById('webcam-button').addEventListener('click', getWebcam)
document.getElementById('upload-image').addEventListener('click', uploadImage)
document.getElementById('input_file').addEventListener('change', changeImage)

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

const video = document.getElementById("video");
const frame1 = document.getElementById("frame1");
const frame2 = document.getElementById("frame2");
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const captureBtn = document.getElementById("capture");
let step = 0;
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => video.play();
  });
captureBtn.addEventListener("click", () => {
  if (step === 0) {
    canvas1.width = video.videoWidth;
    canvas1.height = video.videoHeight;
    ctx1.drawImage(video, 0, 0, canvas1.width, canvas1.height);
    canvas1.style.display = "block";
    video.style.display = "none";
    frame2.appendChild(video);
    video.style.display = "block";
    step = 1;
  } 
  else if (step === 1) {
    canvas2.width = video.videoWidth;
    canvas2.height = video.videoHeight;
    ctx2.drawImage(video, 0, 0, canvas2.width, canvas2.height);
    canvas2.style.display = "block";
    video.style.display = "none";
    step = 2;
  }
});

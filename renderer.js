const video = document.getElementById("video");
const frame1 = document.getElementById("frame1");
const frame2 = document.getElementById("frame2");
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const countdownEl = document.getElementById("countdown");
const downloadBtn = document.getElementById("download");
const resetBtn = document.getElementById("reset");
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
function startCountdown(callback) {
  let count = 3;
  countdownEl.style.display = "block";
  countdownEl.textContent = count;
  const timer = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(timer);
      countdownEl.style.display = "none";
      callback();
    } else {
      countdownEl.textContent = count;
    }
  }, 1000);
}
captureBtn.addEventListener("click", () => {
  startCountdown(capturePhoto);
});


function capturePhoto() {
  if (step === 0) {
    canvas1.width = video.videoWidth;
    canvas1.height = video.videoHeight;
    ctx1.drawImage(video, 0, 0, canvas1.width, canvas1.height);
    canvas1.style.display = "block";
    video.style.display = "none";
    frame2.appendChild(video);
    video.style.display = "block";
    step = 1;
  } else if (step === 1) {
    canvas2.width = video.videoWidth;
    canvas2.height = video.videoHeight;
    ctx2.drawImage(video, 0, 0, canvas2.width, canvas2.height);
    canvas2.style.display = "block";
    video.style.display = "none";
    step = 2;
  }
}
downloadBtn.addEventListener("click", () => {
  if (step < 2) {
    alert("Take both photos first!");
    return;
  }
  const stripCanvas = document.createElement("canvas");
  const stripCtx = stripCanvas.getContext("2d");
  stripCanvas.width = canvas1.width;
  stripCanvas.height = canvas1.height + canvas2.height;
  stripCtx.drawImage(canvas1, 0, 0);
  stripCtx.drawImage(canvas2, 0, canvas1.height);
  const link = document.createElement("a");
  link.download = "photobooth-strip.png";
  link.href = stripCanvas.toDataURL("image/png");
  link.click();
});
resetBtn.addEventListener("click", () => {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  canvas1.style.display = "none";
  canvas2.style.display = "none";
  frame1.appendChild(video);
  video.style.display = "block";
  step = 0;
});

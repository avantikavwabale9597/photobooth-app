const video = document.getElementById("video");
const frame1 = document.getElementById("frame1");
const frame2 = document.getElementById("frame2");
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const countdownEl = document.getElementById("countdown");
const downloadBtn = document.getElementById("download");
const resetBtn = document.getElementById("reset");
const captureBtn = document.getElementById("capture");
const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
let step = 0;
navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
  video.play();
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

function capturePhoto() {
  const frame = step === 0 ? frame1 : frame2;
  const canvas = step === 0 ? canvas1 : canvas2;
  const ctx = step === 0 ? ctx1 : ctx2;
  const rect = frame.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.style.display = "block";
  video.style.display = "none";
  if (step === 0) {
    frame2.appendChild(video);
    video.style.display = "block";
  }
  step++;
}
captureBtn.addEventListener("click", () => {
  if (step >= 2) return;
  startCountdown(capturePhoto);
});
downloadBtn.addEventListener("click", () => {
  if (step < 2) {
    alert("Take both photos first!");
    return;
  }
  const bgColor = "#c4abd4";
  const borderColor = "#e3d2ba";
  const borderWidth = 6;
  const radius = 20;
  const padding = 40;
  const gap = 30;
  const titleHeight = 80;
  const frameW = canvas1.width;
  const frameH = canvas1.height;
  const stripCanvas = document.createElement("canvas");
  const ctx = stripCanvas.getContext("2d");
  stripCanvas.width = frameW + padding * 2;
  stripCanvas.height = titleHeight + frameH * 2 + gap + padding * 2;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, stripCanvas.width, stripCanvas.height);
  ctx.fillStyle = "#8c51bd";
  ctx.font = "bold 28px cursive";
  ctx.textAlign = "center";
  ctx.fillText("Love Yourself by AVA!!", stripCanvas.width / 2, padding + 30);
  function drawFrame(x, y, photoCanvas) {
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + frameW - radius, y);
    ctx.quadraticCurveTo(x + frameW, y, x + frameW, y + radius);
    ctx.lineTo(x + frameW, y + frameH - radius);
    ctx.quadraticCurveTo(
      x + frameW,
      y + frameH,
      x + frameW - radius,
      y + frameH
    );
    ctx.lineTo(x + radius, y + frameH);
    ctx.quadraticCurveTo(x, y + frameH, x, y + frameH - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();
    ctx.save();
    ctx.clip();
    ctx.drawImage(photoCanvas, x, y, frameW, frameH);
    ctx.restore();
  }
  const firstY = padding + titleHeight;
  const secondY = firstY + frameH + gap;
  drawFrame(padding, firstY, canvas1);
  drawFrame(padding, secondY, canvas2);
  const link = document.createElement("a");
  link.download = "photobooth-by-ava.png";
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

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const retryBtn = document.getElementById("retry");
const resultEl = document.getElementById("result");
const endSound = document.getElementById("end-sound");

const sectors = [
  "Tambah Jagung",
  "Jelly",
  "Keju",
  "Zonk",
  "Free 1 Cup Medium",
  "Beli 2 Gratis 1"
];

const colors = ["#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#ffd600", "#ffcc80"];
const len = sectors.length;
const arc = (2 * Math.PI) / len;
let angle = 0;
let isSpinning = false;

function drawWheel() {
  for (let i = 0; i < len; i++) {
    const start = i * arc;
    const end = start + arc;

    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, start, end);
    ctx.fill();

    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(start + arc / 2);
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(sectors[i], 100, 0);
    ctx.restore();
  }
}

function spin() {
  if (isSpinning) return;
  isSpinning = true;
  resultEl.textContent = "";
  retryBtn.style.display = "none";

  const rotation = Math.random() * 360 + 720;
  let current = 0;
  const duration = 3000;
  const interval = 20;
  const totalFrames = duration / interval;
  const increment = rotation / totalFrames;

  const spinAnim = setInterval(() => {
    angle += increment;
    angle %= 360;
    canvas.style.transform = `rotate(${angle}deg)`;
    current += interval;
    if (current >= duration) {
      clearInterval(spinAnim);
      showResult();
      isSpinning = false;
    }
  }, interval);
}

function showResult() {
  const deg = angle % 360;
  const index = len - Math.floor((deg / 360) * len) - 1;
  const result = sectors[index >= 0 ? index : index + len];
  resultEl.textContent = result;
  endSound.currentTime = 0;
  endSound.play();
  retryBtn.style.display = "inline-block";
}

spinBtn.addEventListener("click", spin);
retryBtn.addEventListener("click", () => {
  resultEl.textContent = "";
  retryBtn.style.display = "none";
});

drawWheel();

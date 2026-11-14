const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const brushBtn = document.getElementById("brush");
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const sizeValue = document.getElementById("sizeValue");
const canvasFrame = document.querySelector(".canvas-frame");
const colorSwatches = document.querySelectorAll(".color-swatch");

let painting = false;
let erasing = false;
let currentColor = colorPicker.value;
let lineWidth = Number(brushSize.value);
let lastPoint = null;

function getCanvasPoint(event) {
  const bounds = canvas.getBoundingClientRect();

  return {
    x: ((event.clientX - bounds.left) / bounds.width) * canvas.width,
    y: ((event.clientY - bounds.top) / bounds.height) * canvas.height,
  };
}

function startPosition(event) {
  if (event.button !== 0) return;

  event.preventDefault();
  painting = true;
  lastPoint = getCanvasPoint(event);
  canvas.setPointerCapture(event.pointerId);

  ctx.beginPath();
  ctx.fillStyle = erasing ? "#ffffff" : currentColor;
  ctx.arc(lastPoint.x, lastPoint.y, lineWidth / 2, 0, Math.PI * 2);
  ctx.fill();
  canvasFrame.classList.add("has-drawing");
}

function draw(event) {
  if (!painting) return;

  const point = getCanvasPoint(event);
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = erasing ? "#ffffff" : currentColor;
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
  lastPoint = point;
}

function endPosition(event) {
  if (!painting) return;

  painting = false;
  lastPoint = null;
  ctx.beginPath();

  if (canvas.hasPointerCapture(event.pointerId)) {
    canvas.releasePointerCapture(event.pointerId);
  }
}

function selectBrush() {
  erasing = false;
  brushBtn.classList.add("active");
  brushBtn.setAttribute("aria-pressed", "true");
  eraserBtn.classList.remove("active");
  eraserBtn.setAttribute("aria-pressed", "false");
}

function selectEraser() {
  erasing = true;
  eraserBtn.classList.add("active");
  eraserBtn.setAttribute("aria-pressed", "true");
  brushBtn.classList.remove("active");
  brushBtn.setAttribute("aria-pressed", "false");
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasFrame.classList.remove("has-drawing");
}

function changeColor(color) {
  currentColor = color;
  colorPicker.value = color;
  colorSwatches.forEach((swatch) => {
    const selected = swatch.dataset.color.toLowerCase() === color.toLowerCase();
    swatch.classList.toggle("selected", selected);
    swatch.setAttribute("aria-pressed", String(selected));
  });
}

function changeBrushSize() {
  lineWidth = Number(brushSize.value);
  sizeValue.textContent = `${lineWidth} px`;
  const progress = ((lineWidth - Number(brushSize.min)) /
    (Number(brushSize.max) - Number(brushSize.min))) * 100;
  brushSize.style.background = `linear-gradient(to right, #e9785c 0%, #e9785c ${progress}%, #e9e9e5 ${progress}%, #e9e9e5 100%)`;
}

brushBtn.addEventListener("click", selectBrush);
eraserBtn.addEventListener("click", selectEraser);
clearBtn.addEventListener("click", clearCanvas);
colorPicker.addEventListener("input", (event) => changeColor(event.target.value));
brushSize.addEventListener("input", changeBrushSize);

colorSwatches.forEach((swatch) => {
  swatch.addEventListener("click", () => changeColor(swatch.dataset.color));
});

canvas.addEventListener("pointerdown", startPosition);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", endPosition);
canvas.addEventListener("pointercancel", endPosition);
canvas.addEventListener("lostpointercapture", () => {
  painting = false;
  lastPoint = null;
});

changeColor(currentColor);
changeBrushSize();

const fokus = document.getElementById("timer-fokus");
const istirahat = document.getElementById("istirahat");
const timer = document.getElementById("timer-rehat");
const mulai = document.querySelector(".mulai");
const jeda = document.querySelector(".jeda");
const reset = document.querySelector(".reset");

let waktuTersisa = 1500;
let intervalTimer = null;

mulai.addEventListener("click", () => {
  setInterval(() => {
    waktuTersisa--;

    const menit = Math.floor(waktuTersisa / 60);
    const detik = waktuTersisa % 60;

    timer.textContent =
      menit.toString().padStart(2, "0") +
      " : " +
      detik.toString().padStart(2, "0");

    //   console.log(timer)
  }, 1000);
});

jeda.addEventListener("click", () => {
    console.log("waktu di jeda")
})
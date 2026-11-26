const otpForm = document.getElementById("otp-form");
const otpInputs = Array.from(document.querySelectorAll(".otp-input"));
const generateButton = document.getElementById("generate");
const buttonLabel = generateButton.querySelector(".button-label");
const status = document.getElementById("otp-status");

otpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  generateOTP();
});

otpInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(-1);

    if (input.value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      otpInputs[index - 1].focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      otpInputs[index - 1].focus();
    }

    if (event.key === "ArrowRight" && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  input.addEventListener("paste", (event) => {
    event.preventDefault();
    const digits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpInputs.length - index);

    digits.split("").forEach((digit, offset) => {
      otpInputs[index + offset].value = digit;
    });

    const nextIndex = Math.min(index + digits.length, otpInputs.length - 1);
    otpInputs[nextIndex].focus();
  });
});

function generateOTP() {
  const otp = Array.from(
    { length: otpInputs.length },
    () => Math.floor(Math.random() * 10).toString()
  );

  generateButton.disabled = true;
  generateButton.classList.add("is-loading");
  buttonLabel.textContent = "Membuat...";
  status.textContent = "";

  window.setTimeout(() => {
    otp.forEach((digit, index) => {
      otpInputs[index].value = digit;
      otpInputs[index].classList.remove("animated");
      void otpInputs[index].offsetWidth;
      otpInputs[index].classList.add("animated");
    });

    generateButton.disabled = false;
    generateButton.classList.remove("is-loading");
    buttonLabel.textContent = "Generate OTP";
    status.textContent = `Kode OTP ${otp.join("")} berhasil dibuat.`;
    otpInputs[0].focus();

    window.setTimeout(() => {
      otpInputs.forEach((input) => input.classList.remove("animated"));
    }, 400);
  }, 700);
}

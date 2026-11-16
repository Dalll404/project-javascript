const countDisplay = document.getElementById("count");
const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");
const resetButton = document.getElementById("reset");
const stepInput = document.getElementById("step");

let count = 0;

function renderCount() {
  countDisplay.textContent = count;
}

function changeCount(direction) {
  const step = stepInput.valueAsNumber;

  if (!Number.isSafeInteger(step) || step < 1) {
    stepInput.setCustomValidity("Enter a whole number greater than zero.");
    stepInput.reportValidity();
    return;
  }

  const nextCount = count + direction * step;
  if (!Number.isSafeInteger(nextCount)) {
    stepInput.setCustomValidity("This change exceeds the supported count range.");
    stepInput.reportValidity();
    return;
  }

  stepInput.setCustomValidity("");
  count = nextCount;
  renderCount();
}

stepInput.addEventListener("input", () => {
  stepInput.setCustomValidity("");
});

incrementButton.addEventListener("click", () => {
  changeCount(1);
});

decrementButton.addEventListener("click", () => {
  changeCount(-1);
});

resetButton.addEventListener("click", () => {
  count = 0;
  renderCount();
});

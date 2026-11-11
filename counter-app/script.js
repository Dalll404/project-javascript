const countDisplay = document.getElementById("count");
const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");
const resetButton = document.getElementById("reset");

let count = 0;

function renderCount() {
  countDisplay.textContent = count;
}

incrementButton.addEventListener("click", () => {
  count += 1;
  renderCount();
});

decrementButton.addEventListener("click", () => {
  count -= 1;
  renderCount();
});

resetButton.addEventListener("click", () => {
  count = 0;
  renderCount();
});

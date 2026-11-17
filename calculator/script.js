const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  expression: "",
  justEvaluated: false,
  hasError: false,
};

const display = document.querySelector(".calculator-display");
const expressionDisplay = document.querySelector(".calculator-expression");
const keys = document.querySelector(".calculator-keys");

function updateDisplay(isResult = false) {
  display.value = calculator.displayValue;
  display.classList.toggle("is-result", isResult);
  expressionDisplay.textContent = calculator.expression;
}

function formatResult(value) {
  return String(Number(value.toPrecision(10)));
}

function clearError() {
  if (!calculator.hasError) return;
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  calculator.expression = "";
  calculator.hasError = false;
}

function inputDigit(digit) {
  clearError();

  if (calculator.waitingForSecondOperand || calculator.justEvaluated) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
    calculator.justEvaluated = false;
  } else {
    const digitCount = calculator.displayValue.replace(/\D/g, "").length;
    if (digitCount >= 15) return;
    calculator.displayValue =
      calculator.displayValue === "0" ? digit : calculator.displayValue + digit;
  }

  calculator.expression = "";
  updateDisplay();
}

function inputDecimal() {
  clearError();

  if (calculator.waitingForSecondOperand || calculator.justEvaluated) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    calculator.justEvaluated = false;
  } else if (!calculator.displayValue.includes(".")) {
    calculator.displayValue += ".";
  } else {
    return;
  }

  calculator.expression = "";
  updateDisplay();
}

function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return secondOperand === 0 ? null : firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

function showError(message) {
  calculator.displayValue = message;
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  calculator.expression = "";
  calculator.justEvaluated = false;
  calculator.hasError = true;
  updateDisplay();
}

function handleOperator(nextOperator) {
  clearError();
  const inputValue = parseFloat(calculator.displayValue);

  if (calculator.operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    calculator.expression = `${formatResult(calculator.firstOperand)} ${operatorSymbol(nextOperator)}`;
    updateDisplay();
    return;
  }

  if (calculator.firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (calculator.operator) {
    const result = calculate(calculator.firstOperand, inputValue, calculator.operator);
    if (result === null || !Number.isFinite(result)) {
      showError("Error");
      return;
    }
    calculator.displayValue = formatResult(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  calculator.justEvaluated = false;
  calculator.expression = `${formatResult(calculator.firstOperand)} ${operatorSymbol(nextOperator)}`;
  updateDisplay();
}

function handleUnaryOperator(operator) {
  clearError();
  const inputValue = parseFloat(calculator.displayValue);
  let result;

  if (operator === "✔") {
    if (inputValue < 0) {
      showError("Error");
      return;
    }
    result = Math.sqrt(inputValue);
    calculator.expression = `√(${formatResult(inputValue)})`;
  } else {
    result = inputValue / 100;
    calculator.expression = `${formatResult(inputValue)}%`;
  }

  calculator.displayValue = formatResult(result);
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  calculator.justEvaluated = true;
  updateDisplay(true);
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.expression = "";
  calculator.justEvaluated = false;
  calculator.hasError = false;
  updateDisplay();
}

function handleEqual() {
  if (!calculator.operator || calculator.waitingForSecondOperand) return;

  const firstOperand = calculator.firstOperand;
  const secondOperand = parseFloat(calculator.displayValue);
  const operator = calculator.operator;
  const result = calculate(firstOperand, secondOperand, operator);

  if (result === null || !Number.isFinite(result)) {
    showError("Error");
    return;
  }

  calculator.expression = `${formatResult(firstOperand)} ${operatorSymbol(operator)} ${formatResult(secondOperand)} =`;
  calculator.displayValue = formatResult(result);
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  calculator.justEvaluated = true;
  updateDisplay(true);
}

function operatorSymbol(operator) {
  return { "/": "÷", "*": "×", "-": "−", "+": "+" }[operator];
}

function backspace() {
  clearError();
  if (calculator.waitingForSecondOperand || calculator.justEvaluated) return;
  calculator.displayValue =
    calculator.displayValue.length > 1
      ? calculator.displayValue.slice(0, -1)
      : "0";
  if (calculator.displayValue === "-") calculator.displayValue = "0";
  updateDisplay();
}

function handleKeyInput(event) {
  if (/^\d$/.test(event.key)) {
    inputDigit(event.key);
  } else if (event.key === ".") {
    inputDecimal();
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    handleOperator(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    handleEqual();
  } else if (event.key === "Escape") {
    resetCalculator();
  } else if (event.key === "Backspace") {
    backspace();
  } else {
    return;
  }

  if (["+", "-", "*", "/"].includes(event.key)) {
    keys.querySelectorAll(".operator").forEach((button) => {
      button.classList.toggle("is-selected", button.value === event.key);
    });
  } else {
    keys.querySelectorAll(".operator").forEach((button) => {
      button.classList.remove("is-selected");
    });
  }
}

keys.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || !keys.contains(button)) return;

  if (button.classList.contains("operator")) {
    if (["✔", "%"].includes(button.value)) {
      handleUnaryOperator(button.value);
    } else {
      handleOperator(button.value);
    }
  } else if (button.classList.contains("decimal")) {
    inputDecimal();
  } else if (button.classList.contains("all-clear")) {
    resetCalculator();
  } else if (button.classList.contains("equal-sign")) {
    handleEqual();
  } else {
    inputDigit(button.value);
  }

  keys.querySelectorAll(".operator").forEach((operatorButton) => {
    operatorButton.classList.toggle(
      "is-selected",
      operatorButton.value === calculator.operator
    );
  });
});

document.addEventListener("keydown", handleKeyInput);

const inputElement = document.querySelector(".input");

let buffer = "0";
let total = 0;
let previousOperator = null;

updateScreen();

document.querySelector(".buttons").addEventListener("click", function (event) {
  buttonClick(event.target.innerText);
});

function buttonClick(buttonText) {
  if (isNaN(parseInt(buttonText))) {
    onSymbolClicked(buttonText);
  } else {
    onNumberClicked(buttonText);
  }
  // despues de calcular el nuevo buffer
  // actualizala la pantalla
  updateScreen();
}

// when number buttons are clicked they call this function
function onNumberClicked(num) {
  if (buffer === "0") {
    buffer = num;
  } else {
    buffer += num;
  }
}
function onSymbolClicked(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      previousOperator = null;
      total = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "−":
    case "÷":
    case "×":
    case "+":
      handleMathOperators(symbol);
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }

      executeOperation(parseInt(buffer));

      buffer = total.toString();
      total = 0;
      previousOperator = null;
  }
}
function handleMathOperators(operator) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (total === 0) {
    total = intBuffer;
  } else {
    executeOperation(intBuffer);
  }
  previousOperator = operator;
  buffer = "0";
}

function executeOperation(intBuffer) {
  if (previousOperator === "+") {
    total += intBuffer;
  } else if (previousOperator === "−") {
    total -= intBuffer;
  } else if (previousOperator === "×") {
    total *= intBuffer;
  } else if (previousOperator === "÷") {
    total /= intBuffer;
  }
}

function updateScreen() {
  if (previousOperator !== null) {
    inputElement.innerText = `${total} ${previousOperator} ${buffer}`;
  } else {
    inputElement.innerText = buffer;
  }
}

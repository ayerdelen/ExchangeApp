// datamizi tutalim
const data = {
  USD: { EUR: 0.82, GBP: 0.74, JPY: 103.33 },
  EUR: { USD: 1.23, GBP: 0.91, JPY: 126.51 },
  GBP: { USD: 1.35, EUR: 1.1, JPY: 139.12 },
  JPY: { GBP: 0.0072, USD: 0.0097, EUR: 0.0079 },
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
  for (let i = 0; i < elements.length; i++) {
    const currencyKeyDiv = document.createElement("div");
    currencyKeyDiv.setAttribute(
      "class",
      "custom-radio" + " " + "custom-control"
    );
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("class", "custom-control-input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("class", "custom-control-label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);

    root.appendChild(currencyKeyDiv);
  }
}

const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to icin fonksiyonu cagiralim
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function () {
  const toTargetCheck = document.querySelector(
    "input[name='currency_to']:checked"
  );
  const fromTargetCheck = document.querySelector(
    "input[name='currency_from']:checked"
  );
  if (fromTargetCheck != null && toTargetCheck != null) {
    const fromTarget = document.querySelector(
      "input[name='currency_from']:checked"
    ).value;
    const toTarget = document.querySelector("input[name='currency_to']:checked")
      .value;
    const amount = document.querySelector("input[name='amount']").value;
    const translateAmount = Number(amount);
    const currentCurrencyObject = data[fromTarget];
    const resultForOne = currentCurrencyObject[toTarget];
    const result = translateAmount * resultForOne;

    const currencyResult = document.querySelector("#currency-result");
    const currencyHeader = currencyResult.querySelector("h1");
    currencyHeader.innerHTML =
      translateAmount + " " + fromTarget + " = " + result + " " + toTarget;

    if (fromTarget == toTarget) {
      currencyHeader.innerHTML = "Farklı Seçim Yapınız";
    }
    if (isNaN(translateAmount)) {
      currencyHeader.innerHTML = "Sayı Giriniz";
    }
  } else {
    const currencyResult = document.querySelector("#currency-result");
    const currencyHeader = currencyResult.querySelector("h1");
    currencyHeader.innerHTML = "Seçim Yapınız";
  }
});

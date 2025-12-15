const temperatureInput = document.getElementById("temperature");
const fromUnitSelect = document.getElementById("fromUnit");
const toUnitSelect = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const converterForm = document.getElementById("converterForm");
const resultContainer = document.getElementById("resultContainer");
const resultValue = document.getElementById("resultValue");
const resultUnit = document.getElementById("resultUnit");

// Validar y habilitar/deshabilitar el botón
function validateForm() {
  const hasTemperature = temperatureInput.value.trim() !== "";
  const hasFromUnit = fromUnitSelect.value !== "";
  const hasToUnit = toUnitSelect.value !== "";

  convertBtn.disabled = !(hasTemperature && hasFromUnit && hasToUnit);
}

// Escuchar cambios en los campos
temperatureInput.addEventListener("input", validateForm);
fromUnitSelect.addEventListener("change", validateForm);
toUnitSelect.addEventListener("change", validateForm);

// Función de conversión de temperatura
function convertTemperature(value, fromUnit, toUnit) {
  let celsius;

  // Convertir a Celsius primero
  switch (fromUnit) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
  }

  // Convertir de Celsius a la unidad deseada
  let result;
  switch (toUnit) {
    case "celsius":
      result = celsius;
      break;
    case "fahrenheit":
      result = (celsius * 9) / 5 + 32;
      break;
    case "kelvin":
      result = celsius + 273.15;
      break;
  }

  return result;
}

// Obtener el símbolo de la unidad
function getUnitSymbol(unit) {
  const symbols = {
    celsius: "°C",
    fahrenheit: "°F",
    kelvin: "K",
  };
  return symbols[unit];
}

// Manejar el envío del formulario
converterForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const temperature = parseFloat(temperatureInput.value);
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;

  // Realizar la conversión
  const result = convertTemperature(temperature, fromUnit, toUnit);

  // Mostrar el resultado
  resultValue.textContent = result.toFixed(2);
  resultUnit.textContent = getUnitSymbol(toUnit);

  // Aplicar color según si es positivo o negativo
  resultValue.classList.remove("positive", "negative");
  if (result >= 0) {
    resultValue.classList.add("positive");
  } else {
    resultValue.classList.add("negative");
  }

  // Mostrar el contenedor de resultado con animación
  resultContainer.classList.add("show");
});

// Efecto de escritura al cargar
window.addEventListener("load", function () {
  document.querySelector(".container").style.animation = "fadeInUp 0.8s ease";
});

const temperatureInput = document.getElementById('temperature');
const unitSelect = document.getElementById('unit');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');
const themeSwitcher = document.getElementById('themeSwitcher');
const speakBtn = document.getElementById('speakBtn');
const indicator = document.getElementById('indicator');
const historyList = document.getElementById('history');

function convertTemperature() {
  const temp = parseFloat(temperatureInput.value);
  const unit = unitSelect.value;
  if (isNaN(temp)) {
    result.textContent = "Please enter a valid number.";
    return;
  }

  let c, f, k;
  switch (unit) {
    case "celsius":
      c = temp;
      f = (c * 9 / 5) + 32;
      k = c + 273.15;
      break;
    case "fahrenheit":
      f = temp;
      c = (f - 32) * 5 / 9;
      k = c + 273.15;
      break;
    case "kelvin":
      k = temp;
      c = k - 273.15;
      f = (c * 9 / 5) + 32;
      break;
  }

  const output = `Celsius: ${c.toFixed(2)}°C, Fahrenheit: ${f.toFixed(2)}°F, Kelvin: ${k.toFixed(2)}K`;
  result.textContent = output;

  // Visual Indicator
  if (c < 10) {
    indicator.style.background = "blue";
  } else if (c < 30) {
    indicator.style.background = "orange";
  } else {
    indicator.style.background = "red";
  }

  // History
  const li = document.createElement('li');
  li.textContent = `${temp} ${unit} → ${output}`;
  historyList.prepend(li);
}

function resetFields() {
  temperatureInput.value = "";
  result.textContent = "";
  indicator.style.background = "transparent";
  temperatureInput.focus();
}

function speakOutput() {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(result.textContent);
    speechSynthesis.speak(utterance);
  }
}

// Theme Toggle
themeSwitcher.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

// Events
convertBtn.addEventListener('click', convertTemperature);
resetBtn.addEventListener('click', resetFields);
speakBtn.addEventListener('click', speakOutput);
temperatureInput.addEventListener('input', convertTemperature);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') convertTemperature();
  if (e.key === 'Escape') resetFields();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('Service Worker Registered', reg))
    .catch(err => console.error('Service Worker registration failed', err));
}

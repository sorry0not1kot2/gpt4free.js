const providerSelect = document.getElementById('provider-select');
const modelSelect = document.getElementById('model-select');
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

let selectedProvider = null;
let selectedModel = null;

// Загрузка списка провайдеров
fetch('./providers.json')
  .then(response => response.json())
  .then(providers => {
    providers.forEach(provider => {
      const option = document.createElement('option');
      option.value = provider.name;
      option.text = provider.displayName;
      providerSelect.add(option);
    });
  });

providerSelect.addEventListener('change', () => {
  const selectedProviderName = providerSelect.value;
  selectedProvider = providers.find(p => p.name === selectedProviderName);

  // Очищаем список моделей
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = true;

  if (selectedProvider) {
    // Загрузка списка моделей для выбранного провайдера
    fetch(`./providers/${selectedProvider.name}/models.json`)
      .then(response => response.json())
      .then(models => {
        models.forEach(model => {
          const option = document.createElement('option');
          option.value = model.name;
          option.text = model.displayName;
          modelSelect.add(option);
        });
        modelSelect.disabled = false;
      });
  }
});

modelSelect.addEventListener('change', () => {
  selectedModel = modelSelect.value;
  // ... (код для инициализации выбранной модели) ...
});

sendButton.addEventListener('click', async () => {
  const message = userInput.value;
  userInput.value = '';

  // ... (код для отправки сообщения выбранной модели) ...
});

// ... (код для инициализации выбранной модели) ...

// Пример инициализации модели:
async function initializeModel() {
  if (selectedModel) {
    try {
      const provider = require(`./providers/${selectedProvider.name}/index.js`);
      const model = new provider.default(selectedModel);
      // ... (код для настройки и использования модели) ...
    } catch (error) {
      console.error('Error initializing model:', error);
      // ... (обработка ошибки) ...
    }
  }
}

// ... (код для отправки сообщения выбранной модели) ...

// Пример отправки сообщения:
async function sendMessage(message) {
  if (selectedModel) {
    try {
      const response = await selectedModel.generate(message);
      chatbox.innerHTML += `<p>You: ${message}</p>`;
      chatbox.innerHTML += `<p>GPT-4: ${response}</p>`;
    } catch (error) {
      console.error('Error sending message:', error);
      chatbox.innerHTML += `<p>Error: ${error.message}</p>`;
    }
  }
}

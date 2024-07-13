const providerTypeSelect = document.getElementById('provider-type-select');
const providerSelect = document.getElementById('provider-select');
const modelSelect = document.getElementById('model-select');
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

let selectedProviderType = null;
let selectedProvider = null;
let selectedModel = null;
let currentModel = null;

// Загрузка списка провайдеров
const providers = {
  'ChatCompletion': [
    // ... (список провайдеров для чата) ...
  ],
  'ImageGeneration': [
    // ... (список провайдеров для генерации изображений) ...
  ]
};

// Заполнение выпадающего списка типов провайдеров
for (const providerType in providers) {
  const option = document.createElement('option');
  option.value = providerType;
  option.text = providerType;
  providerTypeSelect.add(option);
}

// Загрузка списка провайдеров для выбранного типа
function loadProviders(providerType) {
  providerSelect.innerHTML = '<option value="">Select Provider</option>';
  providerSelect.disabled = true;

  if (providerType) {
    providers[providerType].forEach(provider => {
      const option = document.createElement('option');
      option.value = provider.name;
      option.text = provider.displayName;
      providerSelect.add(option);
    });
    providerSelect.disabled = false;
  }
}

// Загрузка списка моделей для выбранного провайдера
function loadModels(provider) {
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = true;

  if (provider) {
    fetch(`./providers/${provider.name}/models.json`)
      .then(response => response.json())
      .then(models => {
        models.forEach(model => {
          const option = document.createElement('option');
          option.value = model.name;
          option.text = model.displayName;
          modelSelect.add(option);
        });
        modelSelect.disabled = false;
      })
      .catch(error => {
        console.error('Error loading models:', error);
        chatbox.innerHTML += `<p>Error loading models: ${error}</p>`;
      });
  }
}

// Инициализация выбранной модели
async function initializeModel(providerName, modelName) {
  if (modelName) {
    try {
      const provider = await import(`./providers/${providerName}/index.js`);
      currentModel = new provider.default(modelName);
      userInput.disabled = false;
      sendButton.disabled = false;
    } catch (error) {
      console.error('Error initializing model:', error);
      chatbox.innerHTML += `<p>Error initializing model: ${error}</p>`;
    }
  }
}

// Отправка сообщения выбранной модели
async function sendMessage(message) {
  if (currentModel) {
    try {
      const response = await currentModel.generate(message);
      chatbox.innerHTML += `<p>You: ${message}</p>`;
      chatbox.innerHTML += `<p>GPT-4: ${response}</p>`;
    } catch (error) {
      console.error('Error sending message:', error);
      chatbox.innerHTML += `<p>Error: ${error.message}</p>`;
    }
  }
}

// Обработчик события для выбора типа провайдера
providerTypeSelect.addEventListener('change', () => {
  selectedProviderType = providerTypeSelect.value;

  // Загрузка провайдеров для выбранного типа
  loadProviders(selectedProviderType);
});

// Обработчик события для выбора провайдера
providerSelect.addEventListener('change', () => {
  selectedProvider = providers[selectedProviderType].find(p => p.name === providerSelect.value);

  // Загрузка моделей для выбранного провайдера
  loadModels(selectedProvider);
});

// Обработчик события для выбора модели
modelSelect.addEventListener('change', () => {
  selectedModel = modelSelect.value;
  initializeModel(selectedProvider.name, selectedModel);
});

// Обработчик события для отправки сообщения
sendButton.addEventListener('click', async () => {
  const message = userInput.value;
  userInput.value = '';

  sendMessage(message);
});

const providerSelect = document.getElementById('provider-select');
const modelSelect = document.getElementById('model-select');
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

let selectedProvider = null;
let selectedModel = null;
let currentModel = null;

// Загрузка списка провайдеров
const providers = [
  { name: 'ChatCompletion', displayName: 'Chat Completion' },
  { name: 'ImageGeneration', displayName: 'Image Generation' }
];

providers.forEach(provider => {
  const option = document.createElement('option');
  option.value = provider.name;
  option.text = provider.displayName;
  providerSelect.add(option);
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
      })
      .catch(error => {
        console.error('Error loading models:', error);
        chatbox.innerHTML += `<p>Error loading models: ${error}</p>`;
      });
  }
});

modelSelect.addEventListener('change', () => {
  selectedModel = modelSelect.value;
  initializeModel();
});

sendButton.addEventListener('click', async () => {
  const message = userInput.value;
  userInput.value = '';

  sendMessage(message);
});

// Инициализация выбранной модели
async function initializeModel() {
  if (selectedModel) {
    try {
      const provider = await import(`./providers/${selectedProvider.name}/index.js`);
      currentModel = new provider.default(selectedModel);
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

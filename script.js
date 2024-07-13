const chatContainer = document.getElementById("chat-container");
const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const providerSelect = document.getElementById("provider");
const modelSelect = document.getElementById("model");
const temperatureInput = document.getElementById("temperature");
const streamCheckbox = document.getElementById("stream");

sendButton.addEventListener("click", async () => {
  const userInputValue = userInput.value;
  const provider = providerSelect.value;
  const model = modelSelect.value;
  const stream = streamCheckbox.checked;
  const temperature = parseFloat(temperatureInput.value);

  const options = {
    provider,
    model,
    stream,
    temperature,
  };

  const messages = [{ role: "user", content: userInputValue }];

  try {
    // Импорт нужного провайдера
    let providerInstance;
    if (provider === 'openai') {
      const { default: OpenAIProvider } = await import('./src/providers/openai.js'); 
      providerInstance = new OpenAIProvider();
    } else if (provider === 'google') {
      const { default: GoogleProvider } = await import('./src/providers/google.js'); 
      providerInstance = new GoogleProvider(); 
    } else if (provider === 'anthropic') {
      const { default: AnthropicProvider } = await import('./src/providers/anthropic.js'); 
      providerInstance = new AnthropicProvider(); 
    } else if (provider === 'aryahcr') {
      const { default: AryahcrProvider } = await import('./src/providers/aryahcr.js'); 
      providerInstance = new AryahcrProvider(); 
    } else if (provider === 'blackbox') {
      const { default: BlackboxProvider } = await import('./src/providers/blackbox.js'); 
      providerInstance = new BlackboxProvider(); 
    } else if (provider === 'nextway') {
      const { default: NextwayProvider } = await import('./src/providers/nextway.js'); 
      providerInstance = new NextwayProvider(); 
    } else if (provider === 'chrome') {
      const { default: ChromeProvider } = await import('./src/providers/chrome.js'); 
      providerInstance = new ChromeProvider(); 
    } else if (provider === 'ollama') {
      const { default: OllamaProvider } = await import('./src/providers/ollama.js'); 
      providerInstance = new OllamaProvider(); 
    } else if (provider === 'alibaba') {
      const { default: AlibabaProvider } = await import('./src/providers/alibaba.js'); 
      providerInstance = new AlibabaProvider(); 
    } else if (provider === 'chatbotru') {
      const { default: ChatBotRuProvider } = await import('./src/providers/chatbotru.js'); 
      providerInstance = new ChatBotRuProvider(); 
    } else if (provider === 'stablediffusion') {
      const { default: StableDiffusionProvider } = await import('./src/providers/stablediffusion.js'); 
      providerInstance = new StableDiffusionProvider(); 
    } else if (provider === 'dalle2') {
      const { default: Dalle2Provider } = await import('./src/providers/dalle2.js'); 
      providerInstance = new Dalle2Provider(); 
    } 

    const response = await providerInstance.chatCompletion(messages, options);

    addMessageToChat("👨‍💻", userInputValue);
    addMessageToChat("🤖", response);

    userInput.value = "";
  } catch (error) {
    console.error("Error:", error);
    addMessageToChat("🤖", `Ошибка: ${error.message}`);
  }
});

function addMessageToChat(emoji, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("flex", "items-center", "mb-2");
  messageElement.innerHTML = `<span class="text-2xl mr-2">${emoji}</span><div class="bg-white p-2 rounded-md shadow-sm">${message}</div>`;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
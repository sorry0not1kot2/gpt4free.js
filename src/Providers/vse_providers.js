// src/Providers/ChatCompletion/openai.js
export class OpenAIProvider {
  constructor() {
    this.provider = 'openai';
    this.apiKey = localStorage.getItem('OPENAI_API_KEY') || 'YOUR_API_KEY'; 
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].message.content;
    }
  }
}

// src/Providers/ChatCompletion/google.js
export class GoogleProvider {
  constructor() {
    this.provider = 'google';
    this.apiKey = localStorage.getItem('GOOGLE_API_KEY') || 'YOUR_API_KEY';
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://us-central1-vertexai-api.cloudfunctions.net/vertexai-chat-completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Google API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].message.content;
    }
  }
}

// src/Providers/ChatCompletion/anthropic.js
export class AnthropicProvider {
  constructor() {
    this.provider = 'anthropic';
    this.apiKey = localStorage.getItem('ANTHROPIC_API_KEY') || 'YOUR_API_KEY';
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.anthropic.com/v1/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].text;
    }
  }
}

// src/Providers/ChatCompletion/aryahcr.js
export class AryahcrProvider {
  constructor() {
    this.provider = 'aryahcr';
    this.apiKey = localStorage.getItem('ARYAHCR_API_KEY') || 'YOUR_API_KEY';
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.aryahcr.com/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Aryahcr API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].message.content;
    }
  }
}

// src/Providers/ChatCompletion/blackbox.js
export class BlackboxProvider {
  constructor() {
    this.provider = 'blackbox';
    this.apiKey = localStorage.getItem('BLACKBOX_API_KEY') || 'YOUR_API_KEY';
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.blackbox.ai/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Blackbox API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].message.content;
    }
  }
}

// src/Providers/ChatCompletion/nextway.js
export class NextwayProvider {
  constructor() {
    this.provider = 'nextway';
    this.apiKey = localStorage.getItem('NEXTWAY_API_KEY') || 'YOUR_API_KEY';
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.nextway.ai/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Nextway API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].message.content;
    }
  }
}

// src/Providers/ChatCompletion/chrome.js
export class ChromeProvider {
  constructor() {
    this.provider = 'chrome';
    this.apiKey = localStorage.getItem('CHROME_API_KEY') || 'YOUR_API_KEY';
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.chrome.com/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Chrome API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].message.content;
    }
  }
}

// src/Providers/ChatCompletion/ollama.js
export class OllamaProvider {
  constructor() {
    this.provider = 'ollama';
    this.apiKey = localStorage.getItem('OLLAMA_API_KEY') || 'YOUR_API_KEY';
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.ollama.ai/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].message.content;
    }
  }
}

// src/Providers/ChatCompletion/alibaba.js
export class AlibabaProvider {
  constructor() {
    this.provider = 'alibaba';
    this.apiKey = localStorage.getItem('ALIBABA_API_KEY') || 'YOUR_API_KEY';
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.alibaba.com/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Alibaba API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].message.content;
    }
  }
}

// src/Providers/ChatCompletion/chatbotru.js
export class ChatBotRuProvider {
  constructor() {
    this.provider = 'chatbotru';
    this.apiKey = localStorage.getItem('CHATBOTRU_API_KEY') || 'YOUR_API_KEY';
  }

  async chatCompletion(messages, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.chatbotru.ru/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`ChatBotRu API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choices = data.choices;

    if (stream) {
      return new ReadableStream({
        async pull(controller) {
          for (const choice of choices) {
            for (const delta of choice.delta) {
              if (delta.content) {
                controller.enqueue(delta.content);
              }
            }
          }
          controller.close();
        },
      });
    } else {
      return choices[0].message.content;
    }
  }
}

// src/Providers/ImageGeneration/stablediffusion.js
export class StableDiffusionProvider {
  constructor() {
    this.provider = 'stablediffusion';
    this.apiKey = localStorage.getItem('STABLEDIFFUSION_API_KEY') || 'YOUR_API_KEY';
  }

  async imageGeneration(prompt, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.stablediffusion.com/v1/images/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Stable Diffusion API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.imageUrl;

    return imageUrl;
  }
}

// src/Providers/ImageGeneration/dalle2.js
export class Dalle2Provider {
  constructor() {
    this.provider = 'dalle2';
    this.apiKey = localStorage.getItem('DALLE2_API_KEY') || 'YOUR_API_KEY';
  }

  async imageGeneration(prompt, options) {
    const { model, stream, temperature } = options;

    const response = await fetch(`https://api.dalle2.com/v1/images/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        stream,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`DALL-E 2 API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.imageUrl;

    return imageUrl;
  }
}

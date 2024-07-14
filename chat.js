async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return; // Проверка на пустой ввод

    const response = await fetchChatCompletion(userInput); // Функция для отправки запроса к провайдеру
    document.getElementById('chat-output').innerHTML += `<p>${response}</p>`;
}

async function fetchChatCompletion(input) {
    // Пример запроса к вашему провайдеру
    const response = await fetch('URL_ВАШЕГО_ПРОВАЙДЕРА', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: input })
    });
    const data = await response.json();
    return data.result; // Предполагается, что ответ содержит поле result
}

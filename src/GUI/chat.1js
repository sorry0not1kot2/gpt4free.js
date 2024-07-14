async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const response = await fetchChatCompletion(userInput); // Функция для отправки запроса к провайдеру
    document.getElementById('chat-output').innerHTML += `<p>${response}</p>`;
}

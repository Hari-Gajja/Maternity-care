async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    if (message.trim()) {
        const chatBox = document.querySelector('.chat-box');
        
        // Display the user's message
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(userMessage);
        input.value = '';
        
        // Call the AI API to get the response
        const response = await getAIResponse(message);
        
        // Display the AI's message
        const doctorMessage = document.createElement('div');
        doctorMessage.classList.add('message', 'doctor');
        doctorMessage.innerHTML = `<p>${response}</p>`;
        chatBox.appendChild(doctorMessage);
    }
}

async function getAIResponse(message) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: message}],
                max_tokens: 150
            })
        });
        const data = await response.json();
        
        // Handle different response structures
        if (data.choices && data.choices.length > 0) {
            if (data.choices[0].message && data.choices[0].message.content) {
                return data.choices[0].message.content.trim();  // For ChatGPT API
            } else if (data.choices[0].text) {
                return data.choices[0].text.trim();  // For Completion API
            }
        } else {
            return 'Unexpected response structure.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, there was a problem getting the response. Please try again.';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.innerHTML = `
        <style>
/* Global Styles */


/* Chat Box Styles */
.chat-container {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    position: fixed;
    bottom: 20px;
    right: 20px;
}

.chat-box {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 320px;
    width: 100%;
    display: none;
}

.chat-icon {
    position: relative;
    cursor: pointer;
    margin-left: 10px;
}

.chat-icon img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.notification {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 12px;
    height: 12px;
    background-color: #42b72a;
    border-radius: 50%;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #1877f2;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.chat-messages {
    padding: 10px 15px;
    max-height: 300px;
    overflow-y: auto;
}

.message {
    display: flex;
    justify-content: flex-end; /* Change from 'flex-start' to 'flex-end' */
    align-items: flex-start;
    margin-bottom: 10px;
    padding: 5px;
}


.sender {
    font-weight: bold;
    margin-bottom: 5px;
}

.content {
    background-color: #f0f2f5;
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
}

.message.from-you {
    justify-content: flex-start; /* Change from 'flex-end' to 'flex-start' */
}

.message.from-you .content {
    background-color: #1877f2;
    color: #fff;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 5px;
}

.chat-input {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-top: 1px solid #e4e6eb;
}

.chat-input input {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 20px;
    background-color: #f0f2f5;
    margin-right: 10px;
}

.chat-input button {
    border: none;
    background-color: #1877f2;
    color: #fff;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
}

.chat-input button:hover {
    background-color: #1566db;
}
.message .content {
    background-color: #f0f2f5;
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
    max-width: 70%;
}

.chat-header .user-avatar {
    border-radius: 50%;
    overflow: hidden;
    width: 40px;
    height: 40px;
    margin-right: 10px;
}
.close-btn {
    border: none;
    background-color: #f0f2f5;
    color: #999;
    font-size: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%; /* Làm cho nút tròn */
    cursor: pointer;
}
.message.from-you {
    justify-content: flex-end;
}

.message.from-you .avatar {
    margin-right: 5px;
    margin-left: auto; /* Thêm thuộc tính này để tin nhắn nằm bên phải */
}

/* CSS for bot messages */
.message.from-fb {
    justify-content: flex-start;
}

.message.from-fb .avatar {
    margin-left: 5px;
    margin-right: auto; /* Thêm thuộc tính này để tin nhắn nằm bên trái */
}


            /* Add more CSS styles here */

        </style>
        <div class="chat-container">
        <div class="chat-box">
            <div class="chat-header">
                <div class="user-avatar">
                    <img src="https://i.pinimg.com/236x/8d/b4/be/8db4beec56f88a7eb7ab0f4509011d70.jpg" alt="Avatar">
                </div>
                <span>Facebook User</span>
                <button class="close-btn">&times;</button>
            </div>
            <div class="chat-messages">
                <div class="message from-fb">
                    <div class="avatar from-fb-avatar">
                     
    <img src="https://i.pinimg.com/236x/8d/b4/be/8db4beec56f88a7eb7ab0f4509011d70.jpg" alt="Facebook User Avatar" width="50" height="50">


                    </div>
                    <div class="content">Tin nhắn từ Facebook User</div>
                </div>
                <div class="message from-you">
                    <div class="avatar from-you-avatar">
                        
                    </div>
                    <div class="content">Tin nhắn từ You</div>
                </div>
                <!-- Add more messages here -->
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Nhập tin nhắn..." id="in_0">
                <button>Send</button>
            </div>
        </div>
        <div class="chat-icon">
            <img src="https://i.pinimg.com/236x/8d/b4/be/8db4beec56f88a7eb7ab0f4509011d70.jpg" alt="Avatar">
            <div class="notification"></div>
        </div>
    </div>
`;
    document.body.appendChild(chatContainer);

    const chatIcon = chatContainer.querySelector('.chat-icon');
    const chatBox = chatContainer.querySelector('.chat-box');
    const closeBtn = chatContainer.querySelector('.close-btn');
    const messageInput = chatContainer.querySelector('.chat-input input');
    const sendButton = chatContainer.querySelector('.chat-input button');
    const messagesContainer = chatContainer.querySelector('.chat-messages');

    let isChatBoxOpen = false;

    chatIcon.addEventListener('click', function () {
        if (isChatBoxOpen) {
            chatBox.style.display = 'none';
        } else {
            chatBox.style.display = 'block';
        }
        isChatBoxOpen = !isChatBoxOpen;
    });

    closeBtn.addEventListener('click', function () {
        chatBox.style.display = 'none';
        isChatBoxOpen = false;
    });

    sendButton.addEventListener('click', function () {
        const messageContent = messageInput.value.trim();
        if (messageContent !== '') {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message from-you';
            messageDiv.innerHTML = `
                <div class="avatar from-you-avatar">
                    <img src="https://i.pinimg.com/236x/8d/b4/be/8db4beec56f88a7eb7ab0f4509011d70.jpg" alt="Your Avatar">
                </div>
                <div class="content">${messageContent}</div>
            `;

            messagesContainer.appendChild(messageDiv);

            // Gửi tin nhắn đến chatbot và hiển thị phản hồi
            sendAndReceiveMessageToChatbot(messageContent);

            messageInput.value = '';
        }
    });

    // Hàm để gửi và nhận tin nhắn với chatbot logic
    async function sendAndReceiveMessageToChatbot(message) {
        const stackAIAPIKey = '5469b812-47ca-4f6b-85fc-28ad6c433dcf';
        const stackAIURL = 'https://www.stack-inference.com/run_deployed_flow?flow_id=64cf5412a19b8ff95c2ea0e8&org=b5a4ff7e-80f8-45fe-9087-c26109ca1830';

        const headers = {
            'Authorization': `Bearer ${stackAIAPIKey}`,
            'Content-Type': 'application/json'
        };

        const data = {
            'in-0': message
        };

        try {
            const response = await axios.post(stackAIURL, data, { headers });
            const stackAIResponse = response.data['out-0'] || 'Xin lỗi, tôi không thể trả lời câu hỏi này.';
            displayBotResponse(stackAIResponse);
        } catch (error) {
            console.error('Error communicating with Stack AI:', error);
        }
    }

    // Hiển thị phản hồi từ chatbot logic trong hộp chat
    function displayBotResponse(response) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message from-fb';
        messageDiv.innerHTML = `
            <div class="avatar from-fb-avatar">
                <img src="facebook-avatar.jpg" alt="Facebook User Avatar">
            </div>
            <div class="content">${response}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  messageInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendButton.click();
    }
});


    // Khởi động chatbot khi tải trang
    chatbot();
});

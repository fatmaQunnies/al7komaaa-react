import React, { useState, useEffect } from 'react';
import { database } from './firebase'; // تأكد من استيراد الوحدة بشكل صحيح
import { ref, onValue, push, serverTimestamp } from 'firebase/database';

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messageRef = ref(database, `chats/${chatId}/messages`);
    const handleData = (snapshot) => {
      const messageData = snapshot.val();
      const messageList = [];
      for (let id in messageData) {
        messageList.push({ id, ...messageData[id] });
      }
      setMessages(messageList);
    };

    onValue(messageRef, handleData);
    return () => off(messageRef, 'value', handleData); // نظافة الاستماع لتجنب التكرار
  }, [chatId]);

  const handleSendMessage = () => {
    const message = {
      senderId: 'currentUserId', // يجب استبدالها بمعرف المستخدم الفعلي
      messageText: newMessage,
      timestamp: serverTimestamp(),
    };
    push(ref(database, `chats/${chatId}/messages`), message);
    setNewMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.senderId}</strong>: {message.messageText}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;

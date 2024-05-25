import React, { useEffect, useState } from 'react';
import { database } from './firebase';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const chatRef = database.ref('chats');
    chatRef.on('value', (snapshot) => {
      const chatData = snapshot.val();
      const chatList = [];
      for (let id in chatData) {
        chatList.push({ id, ...chatData[id] });
      }
      setChats(chatList);
    });
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id} onClick={() => onSelectChat(chat.id)}>
          {chat.id}
        </div>
      ))}
    </div>
  );
};

export default ChatList;

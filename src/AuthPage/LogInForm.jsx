import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import Link from "./components/Link";
import { Context } from "../functions/context";
import { projectId } from "../functions/constants";

const LogInForm = (props) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [socket, setSocket] = useState(null);

  // Hooks
  const { setUser } = useContext(Context);

  const onSubmit = (event) => {
    event.preventDefault();

    const headers = {
      "Project-ID": projectId,
      "User-Name": email,
      "User-Secret": password,
    };

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          const user = {
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: email,
            username: email,
            secret: password,
            avatar: response.data.avatar,
            custom_json: {},
            is_online: true,
          };
          setUser(user);

          // إنشاء اتصال WebSocket
          const sessionToken = response.data.session_token; // استخدم الـ session token من الاستجابة
          const socketUrl = `wss://api.chatengine.io/person_v4/?session_token=${sessionToken}`;
          const newSocket = new WebSocket(socketUrl);

          newSocket.onopen = () => {
            console.log("WebSocket connection opened");
          };

          newSocket.onmessage = (event) => {
            console.log("Message from server:", event.data);
          };

          newSocket.onerror = (error) => {
            console.error("WebSocket error:", error);
          };

          newSocket.onclose = (event) => {
            console.log("WebSocket connection closed:", event);
          };

          setSocket(newSocket);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        }
      });
  };

  // تنظيف اتصال WebSocket عند إلغاء تحميل المكون
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <div>
      <div className="form-title">Welcome Back to UnityNet Chat</div>
      <p>Enter the same email and password for UnityNet</p>

      <form onSubmit={onSubmit}>
        <TextInput
          label="Email"
          name="email"
          placeholder="adam@lamorre.co"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          label="Password"
          name="password"
          placeholder="********"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
};

export default LogInForm;

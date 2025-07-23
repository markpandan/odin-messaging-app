import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { fetchPost } from "../utils/fetchUtils";
import AsideWindow from "../components/AsideWindow";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  const { user, token } = useOutletContext();
  const navigate = useNavigate();

  // const [chatError, setChatError] = useState("");
  // const [chatLoading, setChatLoading] = useState(true);
  const [chatContent, setChatContent] = useState({ id: "", messages: [] });
  // const [currentChat, setCurrentChat] = useState("");
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  const handleMessageListClick = async (chatId) => {
    setChatId(chatId);
  };

  const handleMessageSubmit = async (inputs, chatId) => {
    await fetchPost(
      `chats/${chatId}`,
      {
        message: inputs.message,
        senderId: user.id,
      },
      token
    );

    // const response = await fetchGet(`chats/${chatContent.id}`, { token });
    // const jsonData = await response.json();

    // if (!response.ok) {
    //   setChatError(jsonData.message);
    // } else {
    //   const output = jsonData.output;
    //   setChatContent({ id: output.id, messages: output.messages });
    //   setChatError("");
    // }
  };

  return (
    <div className="grid grow grid-cols-4">
      <AsideWindow
        token={token}
        user={user}
        onListClick={handleMessageListClick}
      />
      <ChatWindow
        chatId={chatId}
        user={user}
        token={token}
        onMessageSubmit={handleMessageSubmit}
      />
    </div>
  );
};

export default Home;

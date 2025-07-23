import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { fetchPost } from "../utils/fetchUtils";
import AsideWindow from "../components/AsideWindow";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  const { user, token } = useOutletContext();
  const navigate = useNavigate();
  const [chatId, setChatId] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

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
    setRefresh(true);
  };

  return (
    <div className="grid grow grid-cols-4">
      <AsideWindow
        token={token}
        user={user}
        refresh={refresh}
        onListClick={handleMessageListClick}
      />
      <ChatWindow
        chatId={chatId}
        user={user}
        token={token}
        refresh={refresh}
        onMessageSubmit={handleMessageSubmit}
      />
    </div>
  );
};

export default Home;

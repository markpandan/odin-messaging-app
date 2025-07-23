import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import AddChatDialog from "../components/AddChatDialog";
import AsideWindow from "../components/AsideWindow";
import ChatWindow from "../components/ChatWindow";
import { fetchPost } from "../utils/fetchUtils";

const Home = () => {
  const { user, token } = useOutletContext();
  const navigate = useNavigate();
  const [chatId, setChatId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

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
    <div className="relative grid grow grid-cols-4">
      {isOpenDialog && (
        <AddChatDialog
          token={token}
          onClose={() => {
            setRefresh(true);
            setIsOpenDialog(false);
          }}
        />
      )}
      <AsideWindow
        token={token}
        user={user}
        refresh={refresh}
        onListClick={handleMessageListClick}
      >
        <div className="border-t-1 border-[var(--accent-color)] p-6 text-center">
          <button
            className={`
              cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4 py-2
              hover:bg-[var(--accent-hover-color)]
            `}
            onClick={() => setIsOpenDialog(true)}
          >
            Add New
          </button>
        </div>
      </AsideWindow>
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

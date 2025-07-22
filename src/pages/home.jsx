import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import MessageBalloon from "../components/MessageBalloon";
import MessageList from "../components/MessageList";
import useForm from "../hooks/useForm";
import useGetData from "../hooks/useGetData";
import { fetchGet, fetchPost } from "../utils/fetchUtils";

const Home = () => {
  const { user, token } = useOutletContext();
  const navigate = useNavigate();

  const [chatError, setChatError] = useState("");
  // const [chatLoading, setChatLoading] = useState(true);
  const [chatContent, setChatContent] = useState({ id: "", messages: [] });
  const [currentChatUser, setCurrentChatUser] = useState("");

  const { inputs, setInputs, handleChange } = useForm({
    message: "",
  });

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  const {
    data: messageData,
    loading: messageLoading,
    error: messageError,
  } = useGetData(`users/${user.id}/messages`, token);

  const handleMessageListClick = async (chatId) => {
    const response = await fetchGet(`chats/${chatId}`, { token });
    const jsonData = await response.json();

    if (!response.ok) {
      setChatError(jsonData.message);
    } else {
      const output = jsonData.output;
      setChatContent({ id: output.id, messages: output.messages });
      setChatError("");

      const findOtherUser = jsonData.output.users.find(
        (chatUser) => chatUser.id !== user.id
      );
      setCurrentChatUser(findOtherUser);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    await fetchPost(
      `chats/${chatContent.id}`,
      {
        message: inputs.message,
        senderId: user.id,
      },
      token
    );
    setInputs({ message: "" });

    const response = await fetchGet(`chats/${chatContent.id}`, { token });
    const jsonData = await response.json();

    if (!response.ok) {
      setChatError(jsonData.message);
      console.log("Trigger Here");
    } else {
      const output = jsonData.output;
      setChatContent({ id: output.id, messages: output.messages });
      setChatError("");
    }
  };

  return (
    <div className="grid grow grid-cols-4">
      <aside className="overflow-y-auto border-r-1 border-[var(--accent-color)]">
        {messageError && <div>{messageError}</div>}
        {messageLoading && <div>Loading...</div>}
        <ul className="flex h-full flex-col">
          {messageData.map((chat) => {
            const user = chat.users[0];
            const recentMessage = chat.messages[0];

            return (
              <li key={chat.id} className="p-2">
                <MessageList
                  fullname={[user.firstname, user.lastname]}
                  message={recentMessage.content}
                  onClick={() => handleMessageListClick(chat.id)}
                />
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="col-span-3 bg-[var(--secondary-color)] p-4">
        <div className="flex h-full w-full flex-col rounded-md bg-[var(--primary-color)]">
          <div className="h-18 border-b-1 border-[var(--accent-color)] p-4">
            <p className="text-2xl">
              {currentChatUser
                ? `${currentChatUser.firstname} ${currentChatUser.lastname}`
                : "Select A User To Continue"}
            </p>
          </div>
          <div className="flex grow basis-0 flex-col gap-4 overflow-y-auto p-4">
            {/* {chatLoading && <div>Loading...</div>} */}
            {chatError && (
              <div className="self-center rounded-2xl bg-[var(--accent-color)] p-4">
                {chatError}
              </div>
            )}
            {chatContent.messages.map((message) => {
              const origin = message.senderId == user.id ? "self" : "others";

              if (
                message.senderId == user.id ||
                message.senderId == currentChatUser.id
              ) {
                return (
                  <MessageBalloon key={message.id} origin={origin}>
                    {message.content}
                  </MessageBalloon>
                );
              }
            })}
          </div>
          <form
            className="flex h-18 gap-4 border-t-1 border-[var(--accent-color)] p-4"
            onSubmit={handleMessageSubmit}
          >
            <input
              type="text"
              className={`
                block h-full grow rounded-2xl bg-[var(--tertiary-color)] px-4 text-sm/6
                focus:outline-2 focus:outline-[var(--accent-color)]
              `}
              name="message"
              onChange={handleChange}
              value={inputs.message}
            />
            <button
              type="submit"
              className={`
                cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4
                hover:not-disabled:bg-[var(--accent-hover-color)]
                disabled:cursor-not-allowed
              `}
              disabled={currentChatUser ? false : true}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

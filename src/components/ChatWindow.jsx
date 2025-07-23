import useForm from "../hooks/useForm";
import MessageBalloon from "../components/MessageBalloon";
import { useEffect, useState } from "react";
import { fetchGet } from "../utils/fetchUtils";

const ChatWindow = ({ chatId, user, token, onMessageSubmit }) => {
  const { inputs, setInputs, handleChange } = useForm({
    message: "",
  });

  const [content, setContent] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentChatUser, setCurrentChatUser] = useState();

  useEffect(() => {
    if (!chatId) return;

    const abortController = new AbortController();

    const fetchChat = async () => {
      try {
        const response = await fetchGet(`chats/${chatId}`, { token });
        const jsonData = await response.json();

        if (!response.ok) {
          setError(jsonData.message);
        } else {
          const output = jsonData.output;
          setContent(output.messages);
          setError("");

          const findOtherUser = output.users.find(
            (chatUser) => chatUser.id !== user.id
          );

          setCurrentChatUser(findOtherUser);
        }
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
          setError(`An error has occured. Error Code: ${error.name}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChat();

    return () => abortController.abort();
  }, [chatId, token, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onMessageSubmit(inputs, chatId);
    setInputs({ message: "" });
  };

  return (
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
          {error && (
            <div className="self-center rounded-2xl bg-[var(--accent-color)] p-4">
              {error}
            </div>
          )}
          {content.map((message) => {
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
          onSubmit={handleSubmit}
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
  );
};

export default ChatWindow;

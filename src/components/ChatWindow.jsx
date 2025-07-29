import { Fragment, useEffect, useRef, useState } from "react";
import MessageBalloon from "../components/MessageBalloon";
import useForm from "../hooks/useForm";
import { fetchGet } from "../utils/fetchUtils";

const ChatWindow = ({ chatId, user, token, refresh, onMessageSubmit }) => {
  const { inputs, setInputs, handleChange } = useForm({
    message: "",
  });

  const [content, setContent] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [currentChatUser, setCurrentChatUser] = useState();

  const fileRef = useRef(null);

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
  }, [chatId, token, user, loading]);

  useEffect(() => {
    if (refresh) {
      setLoading(true);
    }
  }, [refresh, setLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onMessageSubmit(inputs, chatId, selectedFile);
    setInputs({ message: "" });
    setSelectedFile("");
    setError("");

    fileRef.current.value = "";
  };

  const onFileChange = (e) => {
    if (e.target.files.length == 0) return;

    const file = e.target.files[0];
    const type = e.target.files[0].type;

    if (type.match(/^image/)) {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Only images are allowed");
    }
  };

  return (
    <div className="col-span-3 bg-[var(--secondary-color)] p-4">
      <div
        className={`flex h-full w-full flex-col justify-center rounded-md bg-[var(--primary-color)]`}
      >
        {!currentChatUser ? (
          <div className="self-center text-3xl">Select A User To Continue</div>
        ) : (
          <>
            <div className="h-18 border-b-1 border-[var(--accent-color)] p-4">
              <p className="text-2xl">
                {`${currentChatUser.firstname} ${currentChatUser.lastname}`}
              </p>
            </div>
            <div
              className={`flex grow basis-0 flex-col-reverse overflow-y-auto scroll-smooth p-4`}
            >
              <div className="relative flex grow flex-col gap-4">
                {loading && (
                  <div
                    className={`
                      absolute flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.3)]
                    `}
                  >
                    Loading...
                  </div>
                )}
                {error && (
                  <div className="self-center rounded-2xl bg-[var(--accent-color)] p-4">
                    {error}
                  </div>
                )}
                {content.map((message) => {
                  const origin =
                    message.senderId == user.id ? "self" : "others";
                  if (
                    message.senderId == user.id ||
                    message.senderId == currentChatUser.id
                  ) {
                    return (
                      <Fragment key={message.id}>
                        <MessageBalloon origin={origin}>
                          {message.content}
                        </MessageBalloon>
                        {message.file && (
                          <MessageBalloon origin={origin}>
                            <img
                              src={message.file.url}
                              alt="Sent Image of Message"
                            />
                          </MessageBalloon>
                        )}
                      </Fragment>
                    );
                  }
                })}
              </div>
            </div>
            {selectedFile && (
              <div
                className={`
                  flex justify-between border-t-1 border-[var(--accent-color)]
                  bg-[var(--tertiary-color)] px-4 py-2
                `}
              >
                <p>
                  Image: <span>{selectedFile.name}</span>
                </p>
                <button
                  className={`
                    cursor-pointer rounded-md px-2
                    hover:bg-[var(--primary-color)]
                  `}
                  onClick={() => setSelectedFile("")}
                >
                  X
                </button>
              </div>
            )}

            <form
              className="flex h-18 gap-4 border-t-1 border-[var(--accent-color)] p-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <label
                htmlFor="image"
                className={`
                  flex cursor-pointer items-center rounded-full bg-[var(--accent-color)] px-3
                  text-2xl
                  hover:bg-[var(--accent-hover-color)]
                `}
              >
                +
                <input
                  ref={fileRef}
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  onChange={onFileChange}
                />
              </label>
              <input
                type="text"
                className={`
                  block h-full grow rounded-2xl bg-[var(--tertiary-color)] px-4 text-sm/6
                  focus:outline-2 focus:outline-[var(--accent-color)]
                `}
                name="message"
                onChange={handleChange}
                value={inputs.message}
                required
              />
              <button
                type="submit"
                className={`
                  cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4
                  hover:not-disabled:bg-[var(--accent-hover-color)]
                  disabled:cursor-not-allowed
                `}
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;

import { useEffect } from "react";
import useGetData from "../hooks/useGetData";
import MessageItem from "./MessageList";

const AsideWindow = ({ token, user, onListClick, refresh, children }) => {
  const { data, loading, setLoading, error } = useGetData(
    `users/${user.id}/messages`,
    token
  );

  useEffect(() => {
    if (refresh) {
      setLoading(true);
    }
  }, [refresh, setLoading]);

  return (
    <aside
      className={`relative flex flex-col overflow-y-auto border-r-1 border-[var(--accent-color)]`}
    >
      {error && <div>{error}</div>}
      {loading && (
        <div
          className={`absolute flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.3)]`}
        >
          Loading...
        </div>
      )}
      <ul className="flex grow flex-col">
        {data.map((chat) => {
          const user = chat.users[0];
          const recentMessage = chat.messages[0];

          return (
            <li key={chat.id} className="p-2">
              <MessageItem
                fullname={[user.firstname, user.lastname]}
                message={recentMessage ? recentMessage.content : ""}
                onClick={() => onListClick(chat.id)}
              />
            </li>
          );
        })}
      </ul>
      {children}
    </aside>
  );
};

export default AsideWindow;

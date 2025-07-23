import useGetData from "../hooks/useGetData";
import MessageList from "./MessageList";

const AsideWindow = ({ token, user, onListClick }) => {
  const { data, loading, error } = useGetData(
    `users/${user.id}/messages`,
    token
  );

  return (
    <aside className="overflow-y-auto border-r-1 border-[var(--accent-color)]">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      <ul className="flex h-full flex-col">
        {data.map((chat) => {
          const user = chat.users[0];
          const recentMessage = chat.messages[0];

          return (
            <li key={chat.id} className="p-2">
              <MessageList
                fullname={[user.firstname, user.lastname]}
                message={recentMessage.content}
                onClick={() => onListClick(chat.id)}
              />
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AsideWindow;

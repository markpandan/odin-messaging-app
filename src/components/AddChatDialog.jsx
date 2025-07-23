import { useState } from "react";
import ButtonElement from "./ButtonElement";
import useGetData from "../hooks/useGetData";
import { fetchPost } from "../utils/fetchUtils";

const AddChatDialog = ({ token, onClose }) => {
  const [currentUserId, setCurrentUserId] = useState("");

  const {
    data: usersList,
    loading,
    error,
    setError,
  } = useGetData("users/outside", token);

  const handleAddClick = async () => {
    const response = await fetchPost(
      "chats/add",
      { ids: [currentUserId] },
      token
    );

    if (!response.ok) {
      setError("An Error Has Occured");
    } else {
      onClose();
    }
  };

  const handleUserListClick = (userId) => {
    setCurrentUserId(userId);
  };

  return (
    <div className="absolute z-2 h-full w-full bg-[rgba(0,0,0,0.8)]">
      <div
        className={`
          absolute top-[50%] left-[50%] flex min-w-sm translate-[-50%] flex-col gap-4 rounded-2xl
          bg-[var(--primary-color)] p-4 text-[var(--text-color)]
        `}
      >
        <h1 className="text-xl">Add New Chat</h1>
        {error && (
          <div className="self-center rounded-md bg-[var(--accent-color)] px-4 py-1 text-center">
            {error}
          </div>
        )}
        <div className="h-64 overflow-y-auto rounded-xl bg-[var(--secondary-color)]">
          {loading && (
            <div className="flex h-full flex-col justify-center text-center">
              Loading
            </div>
          )}

          <ul className="flex flex-col gap-2 px-4 py-3">
            {usersList.length == 0 ? (
              <div className="text-center">No new users for now...</div>
            ) : (
              usersList.map((user) => {
                const style = {
                  selected: `                   
                    cursor-pointer rounded-md px-2 py-1 bg-[var(--accent-color)]
                    hover:bg-[var(--accent-hover-color)]`,
                  "not-selected": `
                    cursor-pointer rounded-md px-2 py-1
                    hover:bg-[var(--tertiary-color)]
                  `,
                };

                return (
                  <li
                    key={user.id}
                    className={
                      style[
                        currentUserId == user.id ? "selected" : "not-selected"
                      ]
                    }
                    onClick={() => handleUserListClick(user.id)}
                  >
                    <p>{user.username}</p>
                    <p className="text-xs italic">{`${user.firstname} ${user.lastname}`}</p>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className="flex justify-center gap-4">
          <ButtonElement
            disabled={currentUserId ? false : true}
            onClick={handleAddClick}
          >
            Add
          </ButtonElement>
          <ButtonElement onClick={onClose}>Cancel</ButtonElement>
        </div>
      </div>
    </div>
  );
};

export default AddChatDialog;

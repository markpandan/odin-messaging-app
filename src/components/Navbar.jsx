import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav
      className={`
        flex items-center justify-between border-b-1 border-[var(--accent-color)] px-5 py-2 text-xl
      `}
    >
      <Link to={"/"}>
        <h1>BuzzChat</h1>
      </Link>
      <div className="flex gap-6 text-sm">
        {Object.keys(user).length !== 0 ? (
          <>
            <Link
              to={"/profile"}
              className={`
                border-yellow-700 px-2
                hover:border-b-1
              `}
            >
              <p>{user.username}</p>
            </Link>
            <Link
              to={"/logout"}
              className={`
                border-yellow-700 px-2
                hover:border-b-1
              `}
            >
              <p>Logout</p>
            </Link>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className={`
                border-yellow-700 px-2
                hover:border-b-1
              `}
            >
              <p>Login</p>
            </Link>
            <Link
              to={"/signup"}
              className={`
                border-yellow-700 px-2
                hover:border-b-1
              `}
            >
              <p>Signup</p>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

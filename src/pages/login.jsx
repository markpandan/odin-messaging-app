import { useState } from "react";
import FloatingContainer from "../components/FloatingContainer";
import InputField from "../components/InputField";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { fetchPost } from "../utils/fetchUtils";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { token, setToken } = useAuth();
  const { inputs, handleChange } = useForm({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchPost("users/login", { ...inputs });
    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
    } else {
      setToken(data.output.token);
      setError("");
    }
  };

  return (
    <FloatingContainer width={"lg"} align={"center"}>
      <h1 className="mb-4 text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit}
        className={`m-auto flex w-sm flex-col gap-4 text-left text-sm`}
      >
        {error && (
          <div className="rounded-2xl bg-[var(--accent-color)] p-4 text-center">
            {error}
          </div>
        )}

        <InputField
          type="text"
          label="Username"
          fieldName="username"
          onChange={handleChange}
          value={inputs.username}
        />
        <InputField
          type="password"
          label="Password"
          fieldName="password"
          onChange={handleChange}
          value={inputs.password}
        />
        <div className="mt-6 text-center">
          <button
            type="submit"
            className={`
              cursor-pointer rounded-md bg-[var(--accent-color)] px-4 py-2
              hover:bg-[var(--accent-hover-color)]
            `}
          >
            Log In
          </button>
        </div>
      </form>
    </FloatingContainer>
  );
};

export default Login;

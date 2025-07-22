import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import FloatingContainer from "../components/FloatingContainer";
import InputField from "../components/InputField";
import useForm from "../hooks/useForm";
import { fetchGet, fetchPut } from "../utils/fetchUtils";

const Profile = () => {
  const { user, token } = useOutletContext();
  const { inputs, setInputs, handleChange } = useForm({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchUser = async () => {
      try {
        const response = await fetchGet(`users/${user.id}`, {
          token,
          signal: abortController.signal,
        });
        const jsonData = await response.json();
        const output = jsonData.output;

        setInputs({
          firstname: output.firstname,
          lastname: output.lastname,
          username: output.username,
          email: output.email,
        });
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
        }
      }
    };
    fetchUser();

    return () => abortController.abort();
  }, [setInputs, token, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchPut(`users/${user.id}`, { ...inputs }, token);
    const jsonData = await response.json();

    console.log(jsonData.message);
  };

  return (
    <FloatingContainer width="4xl" align="start">
      <h1 className="text-2xl">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-4 text-left"
      >
        <div className="grid grid-cols-2 gap-12">
          <InputField
            label={"First Name"}
            fieldName={"firstname"}
            onChange={handleChange}
            value={inputs.firstname}
          />
          <InputField
            label={"Last Name"}
            fieldName={"lastname"}
            onChange={handleChange}
            value={inputs.lastname}
          />
        </div>
        <div className="grid grid-cols-2 gap-12">
          <InputField
            label={"Username"}
            fieldName={"username"}
            onChange={handleChange}
            value={inputs.username}
          />
          <InputField
            label={"Email"}
            fieldName={"email"}
            onChange={handleChange}
            value={inputs.email}
          />
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className={`
              cursor-pointer rounded-md bg-[var(--accent-color)] px-4 py-2
              hover:bg-[var(--accent-hover-color)]
            `}
          >
            Save
          </button>
        </div>
      </form>
    </FloatingContainer>
  );
};

export default Profile;

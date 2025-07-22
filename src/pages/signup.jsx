import FloatingContainer from "../components/FloatingContainer";
import InputField from "../components/InputField";
import useForm from "../hooks/useForm";

const Signup = () => {
  const { inputs, handleChange } = useForm({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <FloatingContainer width={"lg"} align={"center"}>
      <h1 className="mb-4 text-3xl font-bold">Signup</h1>
      <form
        onSubmit={handleSubmit}
        className={`m-auto flex w-sm flex-col gap-4 text-left text-sm`}
      >
        <div className="flex gap-4">
          <InputField
            type="text"
            label="First Name"
            fieldName="firstname"
            onChange={handleChange}
            value={inputs.firstname}
          />
          <InputField
            type="text"
            label="Last Name"
            fieldName="lastname"
            onChange={handleChange}
            value={inputs.lastname}
          />
        </div>
        <InputField
          type="text"
          label="Username"
          fieldName="username"
          onChange={handleChange}
          value={inputs.username}
        />
        <InputField
          type="email"
          label="Email"
          fieldName="email"
          onChange={handleChange}
          value={inputs.email}
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
            Sign Up
          </button>
        </div>
      </form>
    </FloatingContainer>
  );
};

export default Signup;

import FloatingContainer from "../components/FloatingContainer";
import InputField from "../components/InputField";

const Signup = () => {
  return (
    <FloatingContainer>
      <h1 className="mb-4 text-3xl font-bold">Signup</h1>
      <form
        action=""
        className={`m-auto flex w-sm flex-col gap-4 text-left text-sm`}
      >
        <InputField type="text" label="Username" fieldName="username" />
        <InputField type="email" label="Email" fieldName="email" />
        <InputField type="password" label="Password" fieldName="password" />
        <div className="mt-6 text-center">
          <button
            type="submit"
            className={`
              cursor-pointer rounded-md bg-[var(--accent-color)] px-4 py-2
              hover:bg-[var(--hover-color)]
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

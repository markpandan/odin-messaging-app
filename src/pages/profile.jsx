import FloatingContainer from "../components/FloatingContainer";
import InputField from "../components/InputField";

const Profile = () => {
  return (
    <FloatingContainer width="4xl" align="start">
      <h1 className="text-2xl">Profile</h1>
      <form action="" className="mt-4 flex flex-col gap-4 text-left">
        <div className="grid grid-cols-2 gap-12">
          <InputField label={"First Name"} fieldName={"firstname"} />
          <InputField label={"Last Name"} fieldName={"lastname"} />
        </div>
        <div className="grid grid-cols-2 gap-12">
          <InputField label={"Username"} fieldName={"Username"} />
          <InputField
            label={"Email"}
            fieldName={"email"}
            className="col-span-2"
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

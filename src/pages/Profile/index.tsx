import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  return (
    <div className="h-screen flex flex-col gap-4">
      <UpdateProfile />
      <UpdatePassword />
    </div>
  );
};

export default Profile;

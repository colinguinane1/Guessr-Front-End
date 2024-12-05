"use client";
import { useUser } from "@/context/UserContext"; // Import the useUser hook

const UserProfile = () => {
  const { user } = useUser(); // Access the user data from the context

  if (!user) {
    return <div>Loading...</div>; // Or handle the case when the user is not logged in
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;

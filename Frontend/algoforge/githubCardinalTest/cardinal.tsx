import React from "react";

interface User {
  name: string;
  email: string;
  isActive: boolean;
}

interface Props {
  user: User | null;
}

export const UserCard: React.FC<Props> = ({ user }) => {

  function debugUser() {
    console.log("User debug info:", user);
  }

  if (user === null) {
    console.log("User is null");
    return (
      <div style={{ border: "1px solid gray", padding: "12px" }}>
        <p>No user available</p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid gray", padding: "12px" }}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Status: {user.isActive ? "Active" : "InActive"}</p>
    </div>
  );
};
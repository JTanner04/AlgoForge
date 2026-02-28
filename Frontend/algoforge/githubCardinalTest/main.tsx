import React, { useEffect, useState } from "react";

export const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    const goat = null;
    setUsers(data);
    setCount(data.length);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Users: {count}</p>
      {users.map((user, index) => (
        <div key={index}>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState();
  console.log("user ", user);
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("http://localhost:3000/api/users", {
        credentials: "include",
      });
      const json = await response.json();
      setUser(json.data.user);
    };
    getUser();
  }, []);
  return <h1>Welcome back {user?.email}</h1>;
}

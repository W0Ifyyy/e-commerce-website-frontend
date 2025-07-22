import { useEffect, useState } from "react";

type User = {
  userid: string;
  username: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/auth/profile", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const reset = () => {
    setUser(null);
  };

  return { user, loading, reset };
}

/*
TODO: create context so  whole ui sees if user is logged in or not and fix refreshment
 issue(the ui doesnt update when i login and logout)
*/

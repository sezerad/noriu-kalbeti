import React, { useState } from "react";

import { useAuthContext } from "../contexts/AuthContext";
import { getDatabase, ref, set } from "firebase/database";

export default function AdminPage() {
  const { user } = useAuthContext();
  const [activeHW, setactiveHW] = useState("");

  const writeUserData = () => {
    const db = getDatabase();
    set(ref(db, "users/" + user?.uid), {
      role: "user",
      userName: user?.email,
      activeHW: activeHW,
      archievedHW: "",
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setactiveHW(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleOnChange} value={activeHW} />
      <button onClick={writeUserData}>Add Todo</button>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import InlineComponent from "../components/InlineComponent";
import NavBar from "../components/header/NavBar";

type usersDBType = {
  nextLessonDate: string;
  lessonTopic: string;
  assignedHW: string;
};

export default function Dashboard() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const [usersDBEntries, setUsersDBEntries] = useState<usersDBType[]>([]);

  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, `users/${user?.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUsersDBEntries(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef, user?.uid]);

  const listItems = Object.entries(usersDBEntries).map((userDBEntry, index) => (
    <li key={index}>{userDBEntry[0] + " " + userDBEntry[1]}</li>
  ));

  return (
    <div>
      <div className="loginpage-bgimage">
        <NavBar></NavBar>
        <span>{`Welcome, ${user?.name || user?.email}`}</span>
        <button onClick={() => navigate("/update-profile")}>
          <MdAccountCircle size={20} />
          Update my profile
        </button>
        <button onClick={logout}>
          <MdLogout size={20} />
          Logout
        </button>
        <ul>{listItems}</ul>
        <InlineComponent></InlineComponent>
      </div>
    </div>
  );
}

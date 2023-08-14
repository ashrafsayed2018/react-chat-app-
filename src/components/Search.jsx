import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const handleSearch = async (e) => {
    const users = collection(db, "users");
    // Create a query against the collection.
    const q = query(users, where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length == 0) {
        setError(true);
        setUser(null);
        return;
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          setError(false);
        });
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };
  const handleSelect = async () => {
    // check if chats collection exists in firestore database or not
    // create userchats collection

    const combinedIds =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const response = await getDoc(doc(db, "chats", combinedIds));

      if (!response.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedIds), { messages: [] });

        // create user chats

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedIds + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedIds + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedIds + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedIds + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span className="userNotFound">user not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt={user.displayName} />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

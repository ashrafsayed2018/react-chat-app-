import { useState } from "react";
import addAvatar from "../img/addAvatar.png";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress, if needed
        },
        (error) => {
          setError(true);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Rawjly chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img src={addAvatar} alt="add avatar" />
            <span>add an avatar</span>
          </label>
          <button>Sign up</button>

          {error && <span>something went wrong</span>}
        </form>
        <p>
          you already have an account ?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

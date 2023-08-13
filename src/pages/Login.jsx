import { useState } from "react";
import addAvatar from "../img/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      seterror(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Rawjly chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button>Sign in</button>
          {error && <span>something went wrong</span>}
        </form>

        <p>
          you don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

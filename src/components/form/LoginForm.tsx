import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "../../contexts/AuthContext";
import { displayToast } from "../../utils/toast";
import {
  AuthError,
  parseFirebaseErrorMessage,
} from "../../configs/FirebaseConfig";

import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import "./LoginForm.css";

const Login: React.FC = () => {
  const { login } = useAuthContext();

  const [rememberChecked, setRememberChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (emailRef.current?.value && passwordRef.current?.value) {
        await login(
          emailRef.current?.value,
          passwordRef.current?.value,
          rememberChecked
        );
      }
    } catch (e) {
      displayToast(parseFirebaseErrorMessage(e as AuthError), {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberChecked((current) => !current);
  };

  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        <h3>Login</h3>
        <p>Please enter your credentials to login</p>
        <div className="input-grid">
          <span className="user-icon"></span>
          <Input
            id="email"
            ref={emailRef}
            type="email"
            placeholder="Email / Username"
          />
        </div>
        <div className="input-grid">
          <span className="password-icon"></span>
          <Input
            id="password"
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="extra-components">
          <label htmlFor={"rememberMe"}>
            Remember Me
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberChecked}
              onChange={handleRememberMeChange}
            />
          </label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="button-component red-button"
        >
          {loading ? <ClipLoader size={25} color="#FFF" /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Login;

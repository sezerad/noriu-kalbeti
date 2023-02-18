import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";
import {
  AuthError,
  parseFirebaseErrorMessage,
} from "../configs/FirebaseConfig";
import { displayToast } from "../utils/toast";

const Signup: React.FC = () => {
  const { signup } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordConfirmationRef.current?.value) {
      displayToast("Password must match", { type: "error" });
      return;
    }

    setLoading(true);
    try {
      if (emailRef.current?.value && passwordRef.current?.value) {
        await signup(emailRef.current?.value, passwordRef.current?.value);
      }
    } catch (e) {
      displayToast(parseFirebaseErrorMessage(e as AuthError), {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" ref={emailRef} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            ref={passwordRef}
          />
        </div>

        <div>
          <label htmlFor="conf-password">Confirm password</label>
          <input
            id="conf-password"
            name="conf-password"
            type="password"
            ref={passwordConfirmationRef}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>

      <span>
        Already have an account? Click <Link to="/login">here</Link> to login.
      </span>
    </div>
  );
};

export default Signup;

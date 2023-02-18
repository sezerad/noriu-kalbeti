import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { MdArrowBack } from "react-icons/md";

import { useAuthContext } from "../contexts/AuthContext";
import { displayToast } from "../utils/toast";
import {
  AuthError,
  parseFirebaseErrorMessage,
} from "../configs/FirebaseConfig";

const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (emailRef.current?.value) {
        await resetPassword(emailRef.current?.value);
        displayToast("All set! Check you e-mail for further instructions.", {
          type: "success",
        });
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
      <h1>Recover your password</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" ref={emailRef} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <ClipLoader size={25} color="#FFF" /> : "Reset password"}
        </button>
      </form>

      <div />

      <div>
        <MdArrowBack />
        <Link to="/login">Back to login page</Link>{" "}
      </div>
    </div>
  );
};

export default ForgotPassword;

import "./Login.css";
import LoginForm from "../components/form/LoginForm";
import Footer from "../components/footer/Footer";

export default function Login() {
  return (
    <div>
      <div className="loginpage-bgimage">
        <LoginForm />
        <div className="reference-content">
          Image by{" "}
          <a href="https://www.freepik.com/free-vector/hand-drawn-english-school-illustration_28926895.htm#from_view=detail_serie">
            Freepik
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

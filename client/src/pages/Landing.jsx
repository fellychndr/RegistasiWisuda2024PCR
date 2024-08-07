import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/graduation.svg";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h2>
            Congratulation <span>Wisudawan</span> 2024
          </h2>
          <p>
            Selamat kepada semua yang telah menyelesaikan perjalanan pendidikan
            mereka dan melangkah ke masa depan dengan diwisuda hari ini. Semoga
            setiap langkah selanjutnya membawa kesuksesan dan kebahagiaan yang
            tiada batas.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;

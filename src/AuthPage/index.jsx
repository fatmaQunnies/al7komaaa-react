import { useState } from "react";

import valley from "../assets/valley.jpeg";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

const AuthPage = (props) => {
  const [hasAccount, setHasAccount] = useState(false);

  const backgroundImage = {
    backgroundImage: `url(${valley})`, // Here due to variable
  };

  return (
    <div className="background-image" >
      <div className="background-gradient-dark">
        <div style={styles.formContainerStyle}>

          {hasAccount ? (
            <LogInForm onHasNoAccount={() => setHasAccount(false)}   />
          ) : (
            <LogInForm onHasNoAccount={() => setHasAccount(false)}   />
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  formContainerStyle: {
    width: "100%",
    maxWidth: "650px",
    padding: "36px 72px",
  },
  titleStyle: {
    fontSize: "24px",
    fontFamily: "VisbyRoundCF-Heavy",
    letterSpacing: "0.5px",
    color: "white",
    paddingBottom: "11vw",
  },
};

export default AuthPage;

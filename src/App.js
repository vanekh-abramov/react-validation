/* eslint-disable default-case */
/* eslint-disable no-useless-escape */
import { useEffect, useState } from "react";
import style from "./mainStyles.module.scss";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email can`t be empty");
  const [passwordError, setPasswordError] = useState("Password can`t be empty");
  const [formVAlid, setFormVAlid] = useState(false);

  useEffect(() => {
    if(emailError || passwordError) {
      setFormVAlid(false)
    } else {
      setFormVAlid(true)
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Invalid email");
      if (!e.target.value) {
        setEmailError("Email can`t be empty");
      }
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError("Invalid password. Need to be 3 to 8 symbols");
      if (!e.target.value) {
        setPasswordError("Password can`t be empty");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <div className={style.container}>
      <form>
        <h1>Registration</h1>
        {emailDirty && emailError && (
          <p className={style.error_massage}>{emailError}</p>
        )}
        <input
          onChange={(e) => emailHandler(e)}
          value={email}
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Enter your email...."
        />
        {passwordDirty && passwordError && (
          <p className={style.error_massage}>{passwordError}</p>
        )}
        <input
          onChange={(e) => passwordHandler(e)}
          value={password}
          onBlur={(e) => blurHandler(e)}
          name="password"
          type="password"
          placeholder="Enter your password...."
        />
        <button disabled={!formVAlid} type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default App;

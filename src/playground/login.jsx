import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "../baseurl";
import logo from "./img/logo.png";
import image from "./img/LAYER-1_Background.png";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.min.css";
import { injectStyle } from "react-toastify/dist/inject-style";
if (typeof window !== "undefined") {
  injectStyle();
}

export default function LoginComponent() {
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1024px)").matches
  );
  const projectHost = window.location.host.toString().split(":")
  const hostlink = projectHost[1] ? window.location.host : window.location.hostname
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(true);
  let demo;
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  function setIncorrect() {
    setStatus(false);
  }
  function setCorrect() {
    setStatus(true);
  }
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("/signin/", {
        username,
        password,
      })
      .then((response) => {
        demo = response.data.success;
        if (demo == true) {
          localStorage.setItem("UserId", response.data.user_id);
          localStorage.setItem("UserRole", response.data.role);
          localStorage.setItem("UserToken", response.data.token)
          window.location.href = `http://${hostlink}/courses.html`

        } else {
          document.getElementById("error").innerHTML="Invalid Credentials"
        }
      })
      .catch((error) => {
        console.log(error);
        setIncorrect();
      });
  }



  const myStyle = {
    height: "100vh",
    marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>

      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/5.0.0/mdb.min.css"
        rel="stylesheet"
      />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
      <style>
        {`
                @import url('https://fonts.googleapis.com/css2?family=Nerko+One&display=swap');
                * {
                  margin: 0;
                  box-sizing: border-box;
                  font-family: --e-global-typography-text-font-family: "Montserrat";
                }
                :root {
                  --colour-one: #ffd1b7;
                  --colour-two: #fee4d4;
                  --colour-three: #fdb493;
                  --colour-four: #fb966f;
                  --colour-five: #f45f34;
                  --colour-six: #302825;
                  --colour-seven: #a69f9c;
                  --colour-eight: #707e8d;
                }
                
                body {
                  overflow: hidden;
                  height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  // background-image: image-url('bg.jpg');
                  // background: url(bg.jpg');
                  // background-image: url("./img/bg.jpg");
                  background-size: cover;
                }
                .img {
                  width:1280px;
                  height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-size: cover;
                }
                .login_form {
                  position: relative;
                  background: #fff;
                  height: 469px;
                  width: 990px;
                  overflow: hidden;
                }
                .details {
                  position: relative;
                  background: white;
                  height: 400px;
                  width: 350px;
                }
                .welcome {
                  position: absolute;
                  color: var(--colour-six);
                  left: 23%;
                  top: 23%;
                  font-size: 45px;
                  font-weight: 600;
                }
                .wrap:nth-child(1) {
                  position: absolute;
                  top: 35%;
                  left: 20%;
                  margin: 12px;
                  margin-top: 57px;
                }
                .wrap:nth-child(2) {
                  position: absolute;
                  top: 55%;
                  left: 20%;
                  font-size: 15px;
                  margin: 12px;
                  margin-top: 55px;
                }
                .wrap:nth-child(3) {
                  position: absolute;
                  top: 78%;
                  left: 22%;
                  font-size: 15px;
                  margin: 12px;
                  margin-top: 57px;
                }
                .input {
                  border: 1px solid #8080807d;
                  margin: 5px;
                  border-radius: 5px;
                  background: none;
                  width :120%;
                 /* box-shadow: inset 10px 10px 6px -5px rgba(255,209,183,1);*/
                }
                .inputpwd {
                  border: 1px solid #8080807d;
                  margin: 5px;
                  border-radius: 5px;
                  background: none;
                  width :150%;
                 /* box-shadow: inset 10px 10px 6px -5px rgba(255,209,183,1);*/
                }
                label {
                  color: var(--colour-eight);
                  display: block;
                  font-size: 13px;
                }
                .button {
                  background: #5bcfff;
                  position: absolute;
                  width: 80px;
                  top: 77%;
                  right: 10%;
                  padding: 5px;
                  font-color: var(--colour-one);
                  border-radius: 10px;
                  border: none;
                }
                .button .sign {
                  color: #fff;
                  font-size: 15px;
                }
                .fox {
                  position: absolute;
                  top: 25%;
                  left: 55%;
                  height: 18%;
                }
                .back {
                  position: absolute;
                  top: 43%;
                  left: 56%;
                  font-size: 13px;
                  font-weight: 400;
                }
                .errormsg {
                  position: absolute;
                  top: 36%;
                  left: 56%;
                  font-size: 20px;
                  font-color:"red";
                }
                .log {
                  position: absolute;
                  top: 49%;
                  left: 56%;
                  font-size: 13px; 
                  font-weight: 400;
                }
                .nike {
                  position: absolute;
                  top: 66%;
                  left: 56%;
                  font-size: 13px; 
                  font-weight: 400;
                }
                .acc {
                  position: absolute;
                  top: 61%;
                  left: 56%;
                  font-size: 13px;
                  font-weight: 400;
                }
                .customer {
                  position: absolute;
                  top: 72%;
                  left: 56%;
                  font-color: var(--colour-five);
                  background: var(--colour-four);
                  border-radius: 5px;
                  border: none;
                }
                .res {
                  position: absolute;
                  top: 72%;
                  left: 76%;
                  font-color: var(--colour-five);
                  background: var(--colour-four);
                  border-radius: 5px;
                  border: none;
                }
                h3 {
                  font-size: 14px;
                  color: var(--colour-five);
                  padding: 5px;
                }
                .image{
                  height: 40px; 
                  margin-left: 83px;
                  margin-top: 30px;
                }
                .btn-dark {
                  background: #5bcfff;
                  position: absolute;
                  width: 30%;
                  top: 90%;
                  right: 10%;
                  padding: 5px;
                  font-color: var(--colour-one);
                  border-radius: 10px;
                  border: none;
                 }
                 a {
                  color: #3b71ca;
                  text-decoration: underline;
                }
                .tipblock1{
                  margin-top:132px;
                  border-right :2px solid black;
                  height :50px;
                  margin-right : -65px;
                  border-color: #8080807d;
                }
                .tipblock2{
                  margin-top:32px;
                  border-right :2px solid black;
                  height :50px;
                  margin-right : -65px;
                  border-color: #8080807d;
                }
                @media only screen and (min-width: 1024px) {
                  body {
                    overflow: hidden;
                    // font-family: var(--mdb-font-roboto);
                    line-height: 1.6;
                    color: #4f4f4f;
                }
                  .img{
                    display: flex;
                    justify-content: center;
                    height: 126vh;
                  }
                  .login_form{
                    width: 790px;
                  }
                  .welcome{
                    color:'red';
                  }
                 
                }
                `}
      </style>
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className={`img`}

      >

        <div className={`login_form`}>
          <div className={`details`}>
            <img src={logo} className={`image`} />
            <div className={`welcome`}>Class Login</div>
            <div className={`tipblock1`}></div>
            <form onSubmit={handleSubmit}>
              <div className={`wrap`}>
              
                <label style={{ color: "black", fontWeight: "bold" }}>
                  Please enter your teachers credentials
                </label>
                <input
                  type="text"
                  className={`input`}
                  id="username"
                  placeholder="Username"
                  autoFocus
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setCorrect();
                  }}
                />
              </div>
              <div className={`wrap`}>
                <label style={{ color: "black", fontWeight: "bold" }}>Please enter your password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={`inputpwd`}
                  data-type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setCorrect();
                  }
                  }
                />
              </div>
              <div className={`wrap`}>
              
                <label>
                  <a href="">Help with Login?</a>
                </label>
              </div>
              <button
                type="submit"
                className={`button`}
                class=" btn btn-dark btn-rounded"
                disabled={!validateForm()}
              >
                Login
              </button>
            </form>
            <div className={`tipblock2`}></div>
            <ToastContainer />
          </div>

          <div className={`details-two`}>
          <p id="error" className={`errormsg`} style={{color:"red"}}></p>
            <h1 className={`back`}>Tip :</h1>
            <p className={`log`}>
              Press the <b style={{ color: "#5bcfff" }}>Tab</b>{" "}
              key to enter your Pasword
              <br></br>
            </p>
           


            <h1 className={`acc`}>Tip :</h1>
            <p className={`nike`}>
              Press the <b style={{ color: " #5bcfff" }}>Login</b>{" "}
              button to Login
              <br></br>
            </p>
          </div>
        </div>

      </div>

    </>
  );
}

const appTarget = document.createElement("div");
document.body.appendChild(appTarget);
ReactDOM.render(<LoginComponent />, appTarget);

import React from "react";
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ninja from "./img/ninja3.png";
import wizard from "./img/wizard2.png";
import cat from "./img/Cubs.png";
import { Parallax, Background } from "react-parallax";
import image from "./img/LAYER-1_Background.png";

function CoursePage(props) {
    const userToken = localStorage.getItem("UserToken");
    const projectHost = window.location.host.toString().split(":");
    const hostlink = projectHost[1]
        ? window.location.host
        : window.location.hostname;
   if(userToken){
    return (
       <div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                crossorigin="anonymous"
            />
            <style>
                {`body {
                       overflow: hidden;        
                    }
                   
                    .container:hover{
                        transition: 0.3s;
                        opacity:1
                    }
                    .testimonial-card .card-up {
                        height: 120px;
                        overflow: hidden;
                        border-top-left-radius: .25rem;
                        border-top-right-radius: .25rem;
                        }
    
                    .aqua-gradient {
                    background: linear-gradient(40deg, #2096ff, #05ffa3) !important;
                    }
                    .aqua-gradient2 {
                        background: linear-gradient(40deg, #d10ef5, #f6cb13) !important;
                        }
                        .aqua-gradient3 {
                            background: linear-gradient(40deg, #f51648, #16f5c3) !important;
                            }
                    .testimonial-card .avatar {
                        width: 120px;
                        margin-top: -60px;
                        overflow: hidden;
                        border: 5px solid #fff;
                        border-radius: 50%;
                        }
                        .img {
                            // width: 211vh;
                            height: 105vh;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-size: cover;
                          }
                          .photocat {
                            height: 280px;
                            width: 290px;
                          }
                          .photoninja {
                            height: 280px;
                            width: 326px;
                          }
                          .photowiz {
                            height: 280px;
                            width: 326px;
                          }
                          * {
                          box-sizing: border-box;
                        }
                        
                        .zoom {
                          transition: transform .2s;
                          margin: 0 auto;
                        }
                        
                        .zoom:hover {
                          -ms-transform: scale(1.2); /* IE 9 */
                          -webkit-transform: scale(1.2); /* Safari 3-8 */
                          transform: scale(1.2); 
                          border: dotted 1px black;
                          border-radius:20px;
                          background-color:#8080803d;
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
                              // width: 132.6vh;
                            //   height: 126vh;
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
                <Row xs={2} md={3} className="g-6">
                    <Col>
                        <div class="container">
                            <section
                                class="mx-auto my-5"
                                style={{ maxWidth: "23rem" }}
                                // onClick={() =>{
                                //     window.location.href = `http://${hostlink}/tiles.html`
                                //     localStorage.setItem("CourseId","")
                                //     localStorage.setItem("CourseName","Path of the Cat")
                                // }}
                            >
                                <div class=" mt-2 mb-3">
                                    <div class="zoom">
                                        <img
                                            src={cat}
                                            className={`photocat`}
                                            alt="woman avatar"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </Col>
                    <Col>
                        <div class="container">
                            <section
                                class="mx-auto my-5"
                                style={{ maxWidth: "23rem" }}
                                onClick={() =>{
                                    window.location.href = `http://${hostlink}/tiles.html`
                                    localStorage.setItem("CourseId","d2882ea2-810e-46f9-914a-32989ff30580")
                                    localStorage.setItem("CourseName","Path of the Ninja")
                                }
                                }
                            >
                                <div class=" mt-2 mb-3">
                                    <div class="zoom">
                                        <img
                                            src={ninja}
                                            className={`photoninja`}
                                            alt="woman avatar"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </Col>
                    <Col>
                        <div class="container">
                            <section
                                class="mx-auto my-5"
                                style={{ maxWidth: "23rem" }}
                                // onClick={() =>{
                                //     window.location.href = `http://${hostlink}/tiles.html`
                                //     localStorage.setItem("CourseId","")
                                //     localStorage.setItem("CourseName","Path of the Wizard")
                                // }}
                            >
                                <div class=" mt-2 mb-3">
                                    <div class="zoom">
                                        <img
                                            src={wizard}
                                            className={`photowiz`}
                                            alt="woman avatar"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
}

export default CoursePage;

const appTarget = document.createElement("div");
document.body.appendChild(appTarget);

ReactDOM.render(<CoursePage />, appTarget);

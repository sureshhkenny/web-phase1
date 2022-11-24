import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "../baseurl";
import image from "./img/ninja1.jpg";
import lock from "./img/Lock.svg";
import unlock from "./img/Unlock.svg";
import { Parallax, Background } from "react-parallax";
import "./titleStyle.css";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import $ from "jquery";
import Swal from "sweetalert2";
import ReactSlider from 'react-slider'


export default function Tilespage() {
  const [value, setValue] = useState(0);
  const [percent, setPercent] = useState(0);
  const [barCount, setBarCount] = useState([]);
  const loc1 = window.location.href.toString();
  const loc = loc1.replace("tiles.html", "");
  const projectHost = window.location.host.toString().split(":");
  const hostlink = projectHost[1]
    ? window.location.host
    : window.location.hostname;
  const [gameList, setGameList] = useState([]);
  const userId = localStorage.getItem("UserId");
  const userRole = localStorage.getItem("UserRole");
  const userToken = localStorage.getItem("UserToken");
  const CouserId = localStorage.getItem("CourseId");
  const CouserName = localStorage.getItem("CourseName");
  const beltlist = ["White", "Yellow","Orange","Green","Blue","Purple","Brown","Red","Black"]

  var URL;
  if (userRole == "student") {
    URL = "/game";
  }
  if (userRole == "admin") {
    URL = "/master/game";
  }

  const scrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
    setValue(scrolled);
  };

  const stagesnumber = gameList.map((item) => {
    return item.stage_number;
  });

  const stagelen = stagesnumber.filter(
    (item, index) => stagesnumber.indexOf(item) === index
  );

  const getTilesList = () => {
    axios
      .get(`${URL}/${CouserId}`, {
        headers: {
          Authorization: `${userToken}`,
        },
      })
      .then((res) => setGameList(res.data.games));
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollProgress);
    getTilesList();
  }, [gameList]);

  function createProject(item) {
    if (item && userRole == "student") {
      axios
        .post(
          `/u_game/${item.id}`,
          {
            user_id: userId,
            json: item.json,
            name: item.name,
          },
          {
            headers: {
              Authorization: `${userToken}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success == true) {
            const id = response.data.update.id;
            window.location.href = `http://${hostlink}/editor.html?project_file=${id}`;
          }
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    } else {
      window.location.href = `http://${hostlink}/editor.html?project_file=${item.id}`;
    }
  }

  const list = [];
  for(var i =0; i<beltlist.length; i++){
  list.push(
    // gameList.filter(s => s.stage_number.includes(`0${i}`)).map((item) => (
    <div className="row" id={`tile${i}`} >
      <h2
        style={{
          textAlign: "left",
          fontWeight: 700,
          fontSize: "42px",
          paddingLeft: "28px",
          fontWeight: "bold",
          fontFamily: "Montserrat",
        }}
      >
        {beltlist[i] + ' belt'}
      </h2>
      {gameList.map((item) => {
        // const lockimage = item.status ? unlock : lock
        if(beltlist[i] == item.belt.name){
        return (
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" >
            <div
              className={`box`}
              onClick={() => {
                if (item.status == true) {
                  createProject(item)
                }
                else {
                  showAlert()
                }
              }}
            >
              <div>
                <img src={lock} className={`clearance`} style={{display:item.status? "none" : "unset"}}/>
              </div>
              <p className="stageNumber">{`${item.stage}`}</p>
              <img
                src="https://pluspng.com/img-png/png-video-game-open-1000.png"
                style={{ height: "57px", marginTop: "0px" }}
              />
              <hr />
              <p className="stageName">{`${item.name} `}</p>
            </div>
          </div>
        )
            }
      })}
    </div>
  );
    }

  /* jquery */
  const jcode = (id) => {
    $("html,body").animate(
      {
        scrollTop: $(`#tile${id}`).offset().top,
      },
      "slow"
    );
  };

  const up = () => {
    const value = Math.max(percent - 1, 0);
    setPercent(value);

  };

  const down = () => {
    const value = Math.min(percent + 1, stagelen.length);
    setPercent(value);

  };
  const changeCallback = (e) => {
    setBarCount(e)
  if (barCount != "") {
      jcode(barCount);
  }
  
};
  const myComponent = {
    width: "100px",
    height: "320px",
    paddingTop: "20px",
    overflowY: "scroll",
    marginTop: "144px",
    position: "fixed",
  };
  const demoChange = () => {
    var slider = document.getElementById("range");
    slider.addEventListener("wheel", function (e) {
      if (e.deltaY < 0) {
        slider.valueAsNumber += 3;
      } else {
        slider.value -= 3;
      }
      e.preventDefault();
      e.stopPropagation();
    });
  };
  const showAlert = () => {
    Swal.fire({
      title: "Stage Locked",
      text: "Complete Previous lesson to unlock",
      // icon: "success",
      confirmButtonText: "OK",
    });
  }
  return (
    <body>
      <Parallax
        strength={500}
        className={`scroll`}
        bgImage={image}
        bgImageAlt="images"
        bgImageStyle={{
          width: "100%",

          height: "auto",

        }}
      >
        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">

          <div>
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
            />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans:400,300,700,600|Ubuntu:400,300,500,700"
              rel="stylesheet"
              type="text/css"
            />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>

            <style>
              {`  .BsFillArrowUpCircleFill.hover{
            {
              background-color:'lightgrey'
              
            }
        }
              .scrollbar {
                margin-left: 30px;
                float: left;
                height: 300px;
                width: 65px;
                background: #fff;
                overflow-y: scroll;
                margin-bottom: 25px;
              }
              .force-overflow {
                min-height: 450px;
              }
              
              .scrollbar-info::-webkit-scrollbar {
                width: 12px;
                background-color: #F5F5F5;
              }
              
              .scrollbar-info::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
                background-color: #4285F4;
              }
              
              .scrollbar-info {
                scrollbar-color: #4285F4 #F5F5F5;
              }
              body {
                font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
                font-size: 14px;
               
                color: #333;
                
                // overflow-y: hidden;
                
            }
                 
                           
                #cards_landscape_wrap-2{
                  text-align: center;
                  
                }
                #cards_landscape_wrap-2 .container{
                  padding-top: 15px; 
                  padding-bottom: 100px;
                }
                #cards_landscape_wrap-2 a{
                  text-decoration: none;
                  outline: none;
                }
                #cards_landscape_wrap-2 .card-flyer {
                  border-radius: 5px;
                }
                #cards_landscape_wrap-2 .card-flyer .image-box{
                  background:  rgba(255,255,255,.2);
                  overflow: hidden;
                  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.50);
                  border-radius: 5px;
                }
                #cards_landscape_wrap-2 .card-flyer .image-box img{
                  -webkit-transition:all .9s ease; 
                  -moz-transition:all .9s ease; 
                  -o-transition:all .9s ease;
                  -ms-transition:all .9s ease; 
                  width: 100%;
                  height: 200px;
                }
                #cards_landscape_wrap-2 .card-flyer:hover .image-box img{
                  opacity: 0.7;
                  -webkit-transform:scale(1.15);
                  -moz-transform:scale(1.15);
                  -ms-transform:scale(1.15);
                  -o-transform:scale(1.15);
                  transform:scale(1.15);
                }
                #cards_landscape_wrap-2 .card-flyer .text-box{
                  text-align: center;
                  width:100%;
                  height:40vh;
                }
                #cards_landscape_wrap-2 .card-flyer .text-box .text-container{
                  padding: 8px 18px;
                }
                #cards_landscape_wrap-2 .card-flyer{
                  background: rgba(255,255,255,.2);
                  margin-top: 50px;
                  -webkit-transition: all 0.2s ease-in;
                  -moz-transition: all 0.2s ease-in;
                  -ms-transition: all 0.2s ease-in;
                  -o-transition: all 0.2s ease-in;
                  transition: all 0.2s ease-in;
                  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.40);
                }
                #cards_landscape_wrap-2 .card-flyer:hover{
                  background: rgba(255,255,255,.2);
                  box-shadow: 0px 15px 26px rgba(0, 0, 0, 0.50);
                  -webkit-transition: all 0.2s ease-in;
                  -moz-transition: all 0.2s ease-in;
                  -ms-transition: all 0.2s ease-in;
                  -o-transition: all 0.2s ease-in;
                  transition: all 0.2s ease-in;
                  margin-top: 50px;
                }
                #cards_landscape_wrap-2 .card-flyer .text-box p{
                  margin-top: 10px;
                  margin-bottom: 0px;
                  padding-bottom: 0px; 
                  font-size: 14px;
                  letter-spacing: 1px;
                  color: #000000;
                }
                #cards_landscape_wrap-2 .card-flyer .text-box h6{
                  margin-top: 0px;
                  margin-bottom: 4px; 
                  font-size: 18px;
                  font-weight: bold;
                  text-transform: uppercase;
                  font-family: 'Roboto Black', sans-serif;
                  letter-spacing: 1px;
                  color: #00acc1;
                }
                #sticky{
                  position:'-webkit-sticky',
                  position:'sticky'
                }
                  $title-font: 500 18px/1.2 'Ubuntu', sans-serif;
                  $cool-grey: #555;
                  $box-shadow-bottom-heavy: 0 15px 20px rgba(0, 0, 0, 0.1);
                  $transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

                 

                  .img {
                    margin: 0 auto;
                    padding: 0;
                  }

                  hr {
                    margin-top: 20px;
                    margin-bottom: 20px;
                    border: 0;
                    border-top: 1px solid #b5b5b5;
                }

                  .clearance,
                  .lastfew {
                    position: absolute;
                    top: 6px;
                    left: 123px;
                    width: 35px;
                    height: 35px;
                  }

                  .clearance {
                   
                        background-repeat: no-repeat;
                  }

                  .lastfew {
                    background: url(https://www.dropbox.com/s/11uedn6mffchd9z/lastfew-crcl.png?raw=1);
                  }

                  .box h3 {
                    font: $title-font;
                    color: $cool-grey;
                    padding: 1px 0 0 0;
                  }

                  
                  .stageName{
                    font-family: 'Open Sans';
                    color: #555;
                    margin: 3px 8px 0 8px;
                    font-weight: 800;
                    font-size: 16px;
                    margin-top: -16px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                  }
                  .stageNumber{
                    font-family: 'Open Sans';
                    Font-weight: 800;
                    color: #555;
                    padding: 1px 0 0 0;
                    margin-top: -25px;
                   
                    font-size: 2.3em;
                    margin-right: 66px;
                  }

                  .box p span {
                    color: #45A8D6;
                  }

                  ul.colourswatches {
                    height: 20px;
                    margin: 0;
                    padding: 20px 0 0 0;
                    list-style: none;
                    text-align: center;
                    line-height: 20px;
                  }

                  ul.colourswatches li {
                    color: transparent;
                    text-shadow: none;
                    display: inline-block;
                    overflow: hidden;
                    width: 20px;
                    height: 20px;
                    margin: 0 3px;
                    vertical-align: top;
                  }

                 

                  .box {
                    position: relative;
                    display: inline-block;
                    width: 160px;
                    height: 160px;
                    margin-left: -24px;
                    margin: 10px 15px;
                    padding: 20px 0;
                    text-align: center;
                    background-color: #eaeaea85;
                    border-radius: 5px;
                    -webkit-transition: $transition;
                    transition: $transition;
                    cursor: pointer;
                    border: solid 1px #b3a2a2;
                  }

                  .box::after {
                    content: "";
                    border-radius: 5px;
                    position: absolute;
                    z-index: -1;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    box-shadow: $box-shadow-bottom-heavy;
                    opacity: 0;
                    -webkit-transition: $transition;
                    transition: $transition;
                  }

                  .box:hover {
                    -webkit-transform: scale(1.05, 1.05);
                    transform: scale(1.05, 1.05);
                  }

                  .box:hover::after {
                    opacity: 1;
                  }
                  .center-col {
                    flex: 1;
                    background: #aaa;
                    overflow-y: scroll;
                  }
                  .vertical-slider{
                    width: 20px;
                    height: 200px;
                    background-color: #ccc;
                    margin-left: 44px;              
                  }
                  .example-thumb{
                    background-color: white;
                    width: 12px;
                    border-radius: 20px;
                    margin: 4px 4px;
                    text-align: center;  
                }
                  

                `}
            </style>

            <div id="cards_landscape_wrap-2">
              <div className="container">
                <div className="row">
                  <div className="sticky">
                    <h1
                      style={{
                        fontWeight: 700,
                        fontSize: "42px",
                        fontFamily: "Montserrat",
                        letterSpacing: "7px",
                      }}
                    >
                      TILES PAGE
                    </h1>
                  </div>

                  <div
                    className="main"
                    style={{ width: "83%" }}
                  >
                    {list}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <div style={{ height: "200px", overflow: "hidden" }}>
            <div style={myComponent}>
              <BsFillArrowUpCircleFill
                style={{
                  width: "30px",
                  height: "30px",
                  marginTop: "-15px",
                  marginLeft: "40px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  up();
                  jcode(percent);
                }}
              />
              <br />
              <ReactSlider
                className="vertical-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                min={0}
                max={9}
                value={barCount}
                ariaLabel={['Lowest thumb', 'Top thumb']}
                renderThumb={(props, state) => <div {...props}>{value}</div>}
                orientation="vertical"
                onChange={(value) => changeCallback(value)}
                pearling
                minDistance={10}
                marks
                renderMark={(props) => {
                  if (props.key < barCount) {
                    props.className = "example-mark example-mark-completed";
                  } else if (props.key === barCount) {
                    props.className = "example-mark example-mark-active";
                  }
                  return <span {...props} />;
                }}
              />
              <BsFillArrowDownCircleFill
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  marginLeft: "42px",
                  marginTop: "5px",
                }}
                onClick={() => {
                  down();
                  jcode(percent);
                }}
              />
            </div>
          </div>
        </div>
      </Parallax>
    </body>
  );
}

const appTarget = document.createElement("div");
document.body.appendChild(appTarget);

ReactDOM.render(<Tilespage />, appTarget);

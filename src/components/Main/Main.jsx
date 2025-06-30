import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/context";

function Main() {
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);

    const handleChange = (e) => {
        setInput(e.target.value);
        // console.log(e.target.value);
    }
    const handleSendButton = (e) => {
        onSent();
    }

    return (
        <div className="main">
            <div className="navbar-logo">
                <img width="150px" src={assets.nextgpt_icon} alt="" />
                <img  width="50px" src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult?
                <>
                    <div className="greet">
                        <p><span>Hello, Dev.</span></p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Write a React component for a login form with email and password validation.</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                
                        <div className="card">
                            <p>Generate a REST API using Express.js and MongoDB for managing users.</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                
                        <div className="card">
                            <p>Create a Python script that reads a CSV file and filters rows by column value.</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                
                        <div className="card">
                            <p>Generate a SQL query to fetch the latest 5 records for each user.</p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                </>
                 : <div className="result">
                    <div className="result-title">
                        <img width="3%" src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img width="3%" src={assets.nextgpt_logo} alt="" />
                        {loading
                        ?<div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                        
                    </div>
                 </div>
                }
                

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={handleChange} value={input} type="text" placeholder="Enter a prompt here" />
                        <div>
                            
                            {input?<img onClick={handleSendButton} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        NextGPT may display inaccurate info, including about people, so double-check its responses.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
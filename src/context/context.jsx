import React, { createContext, useState } from "react";
import runChat from "../config/nextgpt";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
   

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord)
        },75*index)
    }

    const newChat = () =>{
        setLoading(false);
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData(" ");
        setLoading(true);
        setShowResult(true);
        const actualPrompt = prompt || input;
        localStorage.setItem("recentPrompt", actualPrompt);

        if(!prompt && !prevPrompts.includes(input)){
            setPrevPrompts(prev => [...prev, input])
        }
       
        setRecentPrompt(actualPrompt);
        const response = await runChat(actualPrompt);
       
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0; i<responseArray.length; i++) {
            if(i%2 === 0) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponse3 = newResponse2.split("###").join("<hr />");
        let newResponseArray = newResponse3.split(" ");
        
        for(let i=0; i<newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+" ");
        }
        
        setLoading(false);
        setInput("")

    }
    // onSent("what is javascript");

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;
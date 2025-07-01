import React, { createContext, useContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  
  const delayPara = (index, nextChar, speed) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextChar);
    }, speed * index);
  };

  
  const formatResponse = (response) => {
    let formatted = "";
    const parts = response.split("*");

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        formatted += `<b>${parts[i]}</b>`;
      } else {
        formatted += parts[i];
      }
    }

    return formatted.replace(/\n/g, "<br>");
  };

  
  const onSent = async (customPrompt) => {
    const promptToSend = customPrompt || input;
    if (!promptToSend.trim()) return;

    setLoading(true);
    setShowResult(true);
    setResultData("");
    setPrevPrompts((prev) => [...prev, promptToSend]);
    setRecentPrompt(promptToSend);

    const response = await runChat(promptToSend);
    const formattedResponse = formatResponse(response);
    const chars = formattedResponse.split("");

    
    const speed = Math.max(1, Math.floor(5000 / chars.length));

    chars.forEach((char, i) => delayPara(i, char, speed));

    
    setTimeout(() => {
      setLoading(false);
    }, speed * chars.length);

    setInput("");
  };

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        onSent,
        recentPrompt,
        prevPrompts,
        showResult,
        loading,
        resultData,
        setRecentPrompt,
        setPrevPrompts,
        setShowResult,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMyContext = () => useContext(Context);
export default ContextProvider;

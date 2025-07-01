import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB-EdiVCHCVQ9HAq0VxNBz05Q1vQV3PBM0");
const runChat = async (input) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(input);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini response:", text); // ✅ Ensure this line exists
    return text;
  } catch (error) {
    console.error("Error in runChat:", error);
    return "Something went wrong. Please try again.";
  }
};

export default runChat;

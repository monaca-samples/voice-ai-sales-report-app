import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = ""
const genAI = new GoogleGenerativeAI(API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro"});

export default geminiModel;

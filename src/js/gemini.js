import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "./env";

const API_KEY = env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro"});

export default geminiModel;

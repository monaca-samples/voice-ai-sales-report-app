import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDJ0HYT21EBFv1OwnLM0eKh-dAUE6qb88s"
const genAI = new GoogleGenerativeAI(API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro"});

export default geminiModel;

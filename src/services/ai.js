import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const fetchUrlContent = async (url) => {
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) throw new Error("Lumina could not access this site.");
    
    const html = await response.text(); 
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Cleanup as before
    const mainContent = doc.querySelector('article') || doc.querySelector('main') || doc.body;
    const noise = mainContent.querySelectorAll('script, style, nav, footer, header, aside');
    noise.forEach(el => el.remove());
    
    return mainContent.innerText.trim().substring(0, 10000);
  } catch (error) {
    console.error("Scraping Error:", error);
    throw new Error("Failed to fetch site content. Try a different URL like a Wikipedia page.");
  }
};

export const generateSummary = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    
    const prompt = `
      Context: You are Lumina Core, an academic AI.
      Task: Summarize the following web content into exactly 5-10 high-impact revision bullet points.
      Style: Professional, concise, and focused on core concepts.
      
      Content: ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Lumina Core failed to process the content. Please try again.");
  }
};
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Fetches and cleans content from a URL using a CORS proxy.
 */
export const fetchUrlContent = async (url) => {
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) throw new Error("Lumina could not access this site.");
    
    const html = await response.text(); 
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Target main content areas to avoid ads/nav noise
    const mainContent = doc.querySelector('article') || doc.querySelector('main') || doc.body;
    const noise = mainContent.querySelectorAll('script, style, nav, footer, header, aside, .ads, #comments');
    noise.forEach(el => el.remove());
    
    return mainContent.innerText.trim().substring(0, 12000);
  } catch (error) {
    console.error("Scraping Error:", error);
    throw new Error("Failed to fetch site content. Try a Wikipedia page or a blog post.");
  }
};

/**
 * Core AI Engine: Handles Text, URLs, PDFs, and Images.
 * @param {string} input - Raw text or Base64 image data.
 * @param {boolean} isImage - Set to true if processing an image.
 * @param {string} mimeType - The type of file (e.g., 'image/jpeg', 'image/png').
 */
export const generateSummary = async (input, isImage = false, mimeType = "image/jpeg") => {
  try {
    // Using the stable production model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let promptParts = [];

    if (isImage) {
      // MULTIMODAL PATH (Image Analysis)
      promptParts = [
        {
          inlineData: {
            data: input, 
            mimeType: mimeType,
          },
        },
        `Context: You are Lumina Vision, an academic assistant.
         Task: Analyze this image. Extract key technical details, text, or concepts.
         Format: Provide a structured summary with 5-8 revision-ready bullet points. 
         Style: Educational and precise.`
      ];
    } else {
      // TEXT PATH (PDF, URL, or Paste)
      promptParts = [`
        Context: You are Lumina Core, an academic AI.
        Task: Summarize the following content into high-impact revision points.
        Style: Use professional, concise language. Focus on definitions, core concepts, and key takeaways.
        Format: Return exactly 5-10 bullet points.
        
        Content: ${input}
      `];
    }

    // 
    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("AI returned an empty response.");
    return text;

  } catch (error) {
    console.error("AI Generation Error:", error);
    
    // Specific error handling for "Leaked Key" or "Rate Limit"
    if (error.message.includes("403")) {
      throw new Error("API Key security violation. Please check your environment variables.");
    }
    
    throw new Error("Lumina Core failed to process the content. Please check your connection and try again.");
  }
};
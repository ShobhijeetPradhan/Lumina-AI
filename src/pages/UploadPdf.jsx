import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import { generateSummary } from '../services/ai';
import { saveSummary } from '../services/db'; 

import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const UploadPdf = ({ user, onBack, onLogout }) => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const extractTextFromPDF = async (fileArrayBuffer) => {
    try {
      const pdf = await pdfjsLib.getDocument({ data: fileArrayBuffer }).promise;
      let fullText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        fullText += strings.join(" ") + "\n";
      }
      return fullText;
    } catch (err) {
      console.error("PDF Extraction Error:", err);
      throw new Error("Could not read the PDF content. It might be password protected or an image-only scan.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setResult(null); 
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setResult(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const extractedText = await extractTextFromPDF(arrayBuffer);
      
      if (extractedText.trim().length < 50) {
        throw new Error("This PDF doesn't contain enough selectable text. AI needs text-based PDFs to summarize.");
      }

      const summary = await generateSummary(extractedText);
      setResult(summary);

      const documentTitle = file.name.replace('.pdf', '');
      await saveSummary(
        user.id, 
        documentTitle, 
        summary, 
        'pdf'
      );
      
      console.log("PDF summary saved to Lumina history!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      
      <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-20 flex items-center px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 group cursor-pointer">
            <span className="text-2xl font-black tracking-tighter dark:text-white group-hover:text-violet-600 transition-colors">LUMINA</span>
            <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1"></div>
          </button>
          
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {user?.user_metadata?.full_name || user?.email || "Scholar"}
            </span>
            <button 
              onClick={onLogout} 
              className="px-5 py-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
            📄 PDF Analysis
          </div>
          
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
            Upload Study Material
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-md mx-auto text-sm md:text-base">
            Select a PDF file to extract key insights and generate a revision summary.
          </p>

          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-12 hover:border-violet-500 transition-colors bg-slate-50/50 dark:bg-slate-800/20">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              className="hidden" 
              id="pdf-upload" 
            />
            <label htmlFor="pdf-upload" className="cursor-pointer group flex flex-col items-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {file ? "📑" : "📂"}
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-bold">
                {file ? file.name : "Click to select a PDF"}
              </p>
              <p className="text-slate-400 text-[10px] mt-2 font-black uppercase tracking-widest">
                Max file size: 10MB
              </p>
            </label>
          </div>

          <button 
            onClick={handleUpload}
            disabled={!file || isProcessing}
            className={`w-full py-5 mt-10 rounded-2xl font-black text-lg transition-all shadow-xl
              ${!file || isProcessing 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-blue-500/30 hover:scale-[1.02] active:scale-95 cursor-pointer'}`}
          >
            {isProcessing ? "Lumina Core is Analyzing..." : "Generate Summary"}
          </button>
        </motion.div>

        {/* --- RESULT SECTION --- */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl w-full mt-10 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Summary: {file?.name.replace('.pdf', '')}
              </h3>
            </div>
            
            <div className="space-y-5 text-left">
              {result.split('\n').map((line, i) => line.trim() && (
                <div key={i} className="flex gap-4 text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                  <span>{line.replace(/[*#-]/g, '').trim()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default UploadPdf;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateSummary } from '../services/ai'; 
import { saveSummary } from '../services/db'; 

const PasteText = ({ user, onBack, onLogout }) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [result, setResult] = useState(null); 

  const handleGenerate = async () => {
    if (text.length < 50) {
      alert("Please paste at least 50 characters for a meaningful summary.");
      return;
    }

    setIsSummarizing(true);
    setResult(null); 

    try {
      const summary = await generateSummary(text);
      setResult(summary);
      
      await saveSummary(
        user.id, 
        title, 
        summary, 
        'text'
      );
      
      console.log("Summary generated and saved to history!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-y-auto transition-colors duration-500">
      
      <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-20 flex items-center px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 group cursor-pointer">
            <span className="text-2xl font-black tracking-tighter dark:text-white group-hover:text-violet-600 transition-colors">LUMINA</span>
            <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1"></div>
          </button>

          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {user?.email || "User"}
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

      <main className="flex flex-col items-center justify-start py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-widest mb-6">
            ✍️ Text Summarization
          </div>

          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
            Summarize your Text
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-md mx-auto leading-relaxed text-sm md:text-base">
            Paste your lecture notes or custom text to generate instant, revision-ready bullet points.
          </p>

          <div className="space-y-6">
            <div className="text-left">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">
                Document Title
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for this summary..."
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-all font-medium"
              />
            </div>

            <div className="text-left relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">
                Paste Content
              </label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your study material here..."
                className="w-full h-80 px-6 py-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-all font-medium resize-none text-sm leading-relaxed"
              />
              <div className="absolute bottom-4 right-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {text.length} characters
              </div>
            </div>
          </div>

          <button 
            disabled={!text || isSummarizing}
            onClick={handleGenerate}
            className={`w-full py-5 mt-10 rounded-2xl font-black text-lg transition-all shadow-xl
              ${!text || isSummarizing 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-blue-500/30 hover:scale-[1.02] active:scale-95 cursor-pointer'}`}
          >
            {isSummarizing ? "Lumina is Analyzing..." : "Generate Summary"}
          </button>
        </motion.div>

        {/* --- RESULT SECTION --- */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl w-full mt-12 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800"
          >
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
              {title || "AI Summary Result"}
            </h3>
            <div className="prose dark:prose-invert max-w-none text-left">
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                {result}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default PasteText;
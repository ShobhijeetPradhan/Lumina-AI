import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fetchUrlContent, generateSummary } from '../services/ai';
import { saveSummary } from '../services/db'; 

const PasteLink = ({ user, onBack, onLogout }) => {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleLinkSummary = async (e) => {
    e.preventDefault();
    if (!url.startsWith("http")) {
      alert("Please enter a valid URL (starting with http:// or https://)");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const content = await fetchUrlContent(url);
      
      const summary = await generateSummary(content);
      setResult(summary);

      const pageTitle = url.split('/').pop().replace(/-/g, ' ') || "Web Article";
      
      await saveSummary(
        user.id, 
        pageTitle, 
        summary, 
        'url',
        url 
      );
      
      console.log("URL summary saved to Lumina history!");
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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 shadow-2xl border border-slate-100 dark:border-slate-800 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
            🔗 Link Analysis
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
            Summarize a Website
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium max-w-md mx-auto text-sm md:text-base">
            Paste an article or blog URL to extract the key takeaways and save them to your history.
          </p>

          <form onSubmit={handleLinkSummary} className="space-y-6">
            <div className="text-left">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Website URL</label>
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full px-6 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-all font-medium"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl
                ${isProcessing 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' 
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-blue-500/30 hover:scale-[1.02] active:scale-95 cursor-pointer'}`}
            >
              {isProcessing ? "Lumina is Scraping..." : "Generate Summary"}
            </button>
          </form>
        </motion.div>

        {/* Result Area */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl w-full mt-10 bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Article Insights</h3>
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-cyan-500 hover:underline"
              >
                View Source ↗
              </a>
            </div>
            
            <div className="space-y-4 text-left">
              {result.split('\n').map((line, i) => line.trim() && (
                <div key={i} className="flex gap-4 text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2.5 shrink-0"></div>
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

export default PasteLink;
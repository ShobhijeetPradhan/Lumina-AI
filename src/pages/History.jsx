import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserHistory, deleteSummary } from '../services/db';

const History = ({ user, onBack, onLogout }) => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSummary, setSelectedSummary] = useState(null);

  useEffect(() => {
    if (user?.id) {
      loadHistory();
    }
  }, [user?.id]); 

  const loadHistory = async () => {
    try {
      setLoading(true);
      if (!user?.id) return;
      
      const data = await getUserHistory(user.id);
      setSummaries(data || []);
    } catch (error) {
      console.error("Lumina History Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
  e.stopPropagation(); 
  if (window.confirm("Delete this summary forever?")) {
    try {
      const success = await deleteSummary(id);
      if (success) {
        setSummaries(prev => prev.filter(s => s.id !== id));
        if (selectedSummary?.id === id) setSelectedSummary(null);
      }
    } catch (error) {
      alert("Delete Error: " + error.message);
    }
  }
};

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'url': return '🔗';
      default: return '✍️';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
              {user?.email}
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

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Your Vault</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Revisit your AI-generated insights.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-bold animate-pulse text-xs uppercase tracking-widest">Opening Vault...</p>
          </div>
        ) : summaries.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <div className="text-5xl mb-6 opacity-20">📚</div>
            <p className="text-slate-400 font-bold text-lg">No summaries saved yet.</p>
            <button 
              onClick={onBack}
              className="mt-6 text-violet-500 font-black hover:underline"
            >
              Start summarizing now →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map((item) => (
              <motion.div
                layoutId={item.id}
                key={item.id}
                onClick={() => setSelectedSummary(item)}
                className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none cursor-pointer hover:border-violet-500 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-3xl bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl">{getTypeIcon(item.type)}</span>
                    <button 
                      onClick={(e) => handleDelete(item.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight">{item.title}</h4>
                </div>
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-4">
                  {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedSummary && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedSummary(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[85vh] rounded-[3rem] p-8 md:p-14 overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-10 right-10 text-slate-400 hover:text-rose-500 transition-colors text-2xl"
                onClick={() => setSelectedSummary(null)}
              >✕</button>
              
              <div className="mb-10">
                <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-black uppercase tracking-[0.15em]">
                  {selectedSummary.type} Summary
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-6 leading-tight">
                  {selectedSummary.title}
                </h3>
                {selectedSummary.source_url && (
                  <a 
                    href={selectedSummary.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-500 text-xs font-bold hover:underline mt-4 inline-block"
                  >
                    Source Document ↗
                  </a>
                )}
              </div>

              <div className="space-y-6 text-left border-t border-slate-100 dark:border-slate-800 pt-10">
                {selectedSummary.content.split('\n').map((line, i) => line.trim() && (
                  <div key={i} className="flex gap-5 text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-base md:text-lg">
                    <div className="w-2.5 h-2.5 rounded-full bg-violet-500 mt-2.5 shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                    <span>{line.replace(/[*#-]/g, '').trim()}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;
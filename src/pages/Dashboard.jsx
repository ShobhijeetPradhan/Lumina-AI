import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ user, onLogout, onUploadClick, onPasteClick, onLinkClick, onImageClick, onHistoryClick }) => {
  const cards = [
    {
      id: 'text',
      title: "Paste Text",
      description: "Paste your lecture notes or study material directly for a quick summary.",
      icon: "✍️",
      color: "from-violet-500 to-purple-600",
      action: "Paste Content"
    },
    {
      id: 'pdf',
      title: "Upload PDF",
      description: "Upload your textbooks or syllabi PDFs and let AI distill the key points.",
      icon: "📁",
      color: "from-blue-500 to-cyan-500",
      action: "Choose File"
    },
    {
      id: 'link',
      title: "Paste Link",
      description: "Submit a URL to a blog, article, or online document for an instant summary.",
      icon: "🔗",
      color: "from-emerald-500 to-teal-500",
      action: "Submit Link"
    },
    // 1. Added the Lumina Vision Card
    {
      id: 'image',
      title: "Lumina Vision",
      description: "Upload a photo of your handwritten notes or diagrams for AI analysis.",
      icon: "🖼️",
      color: "from-rose-500 to-orange-500",
      action: "Analyze Photo"
    }
  ];

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Scholar";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      
      <header className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
             <span className="text-2xl font-black tracking-tighter dark:text-white uppercase">LUMINA</span>
             <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1"></div>
          </div>

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
            Welcome back, {displayName.split(' ')[0]}!
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            What are we summarizing today?
          </p>
        </motion.div>

        {/* 2. Updated grid-cols to handle 4 cards gracefully */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-violet-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl mb-6 shadow-lg shadow-violet-500/10 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-8">
                  {card.description}
                </p>
              </div>
              
              <button 
                onClick={() => {
                  if (card.id === 'text') onPasteClick?.();
                  if (card.id === 'pdf') onUploadClick?.();
                  if (card.id === 'link') onLinkClick?.();
                  if (card.id === 'image') onImageClick?.(); // 3. Added Image Click Handler
                }}
                className="w-full py-3.5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-black hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs cursor-pointer"
              >
                {card.action}
              </button>
            </motion.div>
          ))}
        </div>

        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Revision Vault</h2>
            <button 
              onClick={onHistoryClick} 
              className="px-6 py-2 rounded-xl text-sm font-bold text-violet-600 dark:text-violet-400 bg-violet-600/10 hover:bg-violet-600 hover:text-white transition-all cursor-pointer"
            >
              View Full History →
            </button>
          </div>
          
          <div 
            onClick={onHistoryClick} 
            className="group p-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 bg-white/50 dark:bg-slate-900/50 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all cursor-pointer"
          >
              <div className="text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">📚</div>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Access your past summaries</p>
              <p className="text-xs opacity-60 mt-1">Click to browse your personal knowledge vault.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
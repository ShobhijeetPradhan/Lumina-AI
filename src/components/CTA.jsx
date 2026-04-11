import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section id="revise" className="py-32 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
            Stop rereading. Revise smarter.
          </h2>

          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Upload your PDF or notes and get clear, concise bullet points for quick revision — 
            free, open source, and continuously improving based on user feedback.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-10 py-5 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-black text-xl rounded-2xl shadow-2xl shadow-blue-500/30 hover:scale-105 transition-all duration-300 active:scale-95 flex items-center gap-3"
            >
              <span>⚡</span>
              Try LUMINA free
            </button>
            
            <button className="px-10 py-5 border-2 border-violet-200 dark:border-violet-500/30 text-violet-600 dark:text-violet-400 font-black text-xl rounded-2xl hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all duration-300">
              View on GitHub
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTA;
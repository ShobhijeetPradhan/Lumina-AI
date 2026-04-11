import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onStartClick }) => { 
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full pt-28 pb-20 flex flex-col items-center justify-center text-center"
    >
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50/50 dark:bg-violet-500/10 mb-10">
        <span className="text-violet-600 dark:text-violet-400">⚡</span>
        <span className="text-sm font-bold text-violet-700 dark:text-violet-300 uppercase tracking-widest">
          Free & Open-Source Revision Tool
        </span>
      </div>

      <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white max-w-5xl leading-[0.95] mb-10">
        Turn PDFs & notes into <br />
        <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          quick revision points
        </span>
      </h1>

      <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-12">
        Summarize PDFs and text into concise, revision-ready bullet points using 
        open-source AI. Built for students and developers.
      </p>

      <button 
        onClick={onStartClick} 
        className="px-10 py-5 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-blue-500/30 hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
      >
        ⚡ Try it free
      </button>
    </motion.section>
  );
};

export default Hero;
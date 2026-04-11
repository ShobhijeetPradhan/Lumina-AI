import React from 'react';
import { motion } from 'framer-motion';

const Purpose = () => {
  return (
    <section id="purpose" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
              The Idea Behind It
            </h2>
            
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Studying long PDFs or lecture notes can feel overwhelming, especially during 
                exams or interview prep. Most textbooks are text-heavy and lack visuals, 
                making revision tiring and less engaging.
              </p>
              
              <p>
                With <span className="text-violet-600 dark:text-violet-400 font-semibold">LUMINA</span>, 
                we transform your PDFs or pasted notes into concise 5–10 bullet points. 
                Each bullet is paired with relevant visual cues, making concepts easier 
                to remember and keeping revision interesting.
              </p>
              
              <p>
                Whether preparing for exams, interviews, or personal learning, LUMINA 
                keeps you focused, engaged, and efficient. Visuals + concise summaries = 
                faster learning with more fun!
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="relative">
              <svg width="200" height="300" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-violet-200 dark:text-violet-500/20">
                <circle cx="50" cy="40" r="18" stroke="currentColor" strokeWidth="8" className="text-violet-300 dark:text-violet-400" />
                <rect x="46" y="75" width="8" height="35" rx="4" fill="currentColor" className="text-violet-300 dark:text-violet-400" />
                <circle cx="50" cy="130" r="5" fill="currentColor" className="text-violet-300 dark:text-violet-400" />
              </svg>
              
              <div className="absolute inset-0 bg-violet-400/20 blur-[60px] -z-10 rounded-full"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Purpose;
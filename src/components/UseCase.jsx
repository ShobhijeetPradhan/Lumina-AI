import React from 'react';
import { motion } from 'framer-motion';

const UseCase = () => {
  const cases = [
    {
      title: "Exam Revision",
      desc: "Turn long syllabus PDFs into concise bullet points for quick and effective revision."
    },
    {
      title: "Interview Preparation",
      desc: "Revise concepts, notes, and FAQs quickly to be interview-ready."
    },
    {
      title: "Long Documents & Blogs",
      desc: "Skip the fluff and get only key takeaways from lengthy articles or PDFs."
    },
    {
      title: "Quick Refresh Before Meetings",
      desc: "Review key points from documents or notes in minutes instead of hours."
    }
  ];

  return (
    <section id="use-case" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-12 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="80" height="80" rx="15" stroke="#C4B5FD" strokeWidth="6" />
                <line x1="25" y1="35" x2="75" y2="35" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" />
                <line x1="25" y1="50" x2="75" y2="50" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" />
                <line x1="25" y1="65" x2="75" y2="65" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" />
                <line x1="25" y1="80" x2="55" y2="80" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" />
              </svg>
              <div className="absolute -inset-4 bg-violet-500/10 blur-2xl -z-10 rounded-[4rem]"></div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Use case
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Whether you're studying, preparing for interviews, or just need a quick refresher — LUMINA helps you revise faster.
            </p>

            <ul className="space-y-8">
              {cases.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-violet-500 font-bold text-2xl mt-[-4px]">•</span>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white inline">
                      {item.title}: 
                    </h4>
                    <span className="text-lg text-slate-600 dark:text-slate-400 ml-2">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default UseCase;
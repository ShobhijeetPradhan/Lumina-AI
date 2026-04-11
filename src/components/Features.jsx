import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const featureList = [
    {
      icon: "＋",
      title: "Upload PDFs or Paste Text",
      description: "Upload PDFs or paste text directly — works for lecture notes, syllabi, or interview prep."
    },
    {
      icon: "≡",
      title: "AI Generates Concise Summaries",
      description: "Get 5-10 clear bullet points generated instantly — perfect for exams, interviews, or quick learning."
    },
    {
      icon: "⁕",
      title: "Revise in Minutes",
      description: "All your summaries are saved and accessible anytime — revise faster and more efficiently."
    }
  ];

  return (
    <section id="features" className="py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featureList.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group p-12 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/40 dark:shadow-none hover:border-violet-500/50 transition-all duration-500 text-center"
            >
              <div className="text-4xl text-violet-600 dark:text-violet-400 mb-8 font-light group-hover:scale-125 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
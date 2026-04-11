import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 pt-20 pb-10 transition-colors duration-300 border-t border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-black tracking-tighter dark:text-white">LUMINA</span>
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2"></div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
              LUMINA is an open-source AI-powered revision tool that turns long study material into fast, visual, exam-ready summaries.
            </p>
            <p className="mt-6 text-slate-400 text-xs">
              © 2026 LUMINA
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Creator
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="https://github.com/ShobhijeetPradhan" target='_blank' className="text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm transition-colors">
                  GitHub Profile
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/shobhijeet-pradhan/" target='_blank' className="text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm transition-colors">
                  LinkedIn
                </a>
              </li>
              <li className="pt-2">
                <a href="https://my-portfolio-sk-tau.vercel.app/" target='_blank'>
                <button className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/20 transition-all text-sm">
                  Hire Me
                </button>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 text-center">
          <p className="text-slate-400 text-xs">
            Built with <span className="text-rose-500">❤️</span> by <span className="text-slate-600 dark:text-slate-300 font-medium">Shobhijeet Pradhan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
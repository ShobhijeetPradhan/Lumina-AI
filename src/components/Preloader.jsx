import React from 'react';

const Preloader = ({ isExiting }) => {
  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center 
                    bg-slate-50 dark:bg-slate-950 transition-all duration-700 ease-in-out
                    ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 border-2 border-transparent border-t-blue-500 border-b-blue-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
        <div className="absolute w-20 h-20 border-2 border-transparent border-l-rose-500 border-r-rose-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        <div className="absolute w-16 h-16 border-2 border-transparent border-t-yellow-400 border-b-yellow-400 rounded-full animate-[spin_1s_linear_infinite]"></div>
        <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-pulse"></div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-black tracking-[0.3em] text-slate-800 dark:text-slate-100">
          LUMINA
        </h2>
      </div>
    </div>
  );
};

export default Preloader;
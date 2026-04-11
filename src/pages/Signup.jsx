import React, { useState } from 'react'; 
import { motion } from 'framer-motion';
import { signUp, signIn } from '../services/auth'; 

const Signup = ({ view, onSwitch, onBack }) => {
  const isSignup = view === 'signup';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await signUp(email, password, fullName); 
        
        if (error) throw error;

        if (data.user && !data.session) {
          alert('Verification email sent! Please check your inbox (and spam) to confirm your account.');
          onSwitch(); 
        } else {
          alert('Account created successfully!');
        }
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      if (error.message.includes("Email not confirmed")) {
        alert("Please confirm your email address before signing in. Check your inbox for the link!");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col justify-center px-8 md:px-24 lg:px-32 z-10 bg-white dark:bg-slate-950"
      >
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 text-slate-400 hover:text-violet-600 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
        >
          ← Back to Home
        </button>

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">
            {isSignup ? 'Join LUMINA and start revising smarter today.' : 'Enter your details to access your summaries.'}
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {isSignup && (
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Shobhijeet Pradhan"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-violet-500 outline-none dark:text-white transition-all font-medium"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-violet-500 outline-none dark:text-white transition-all font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-violet-500 outline-none dark:text-white transition-all font-medium"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 mt-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform active:scale-95 cursor-pointer disabled:opacity-50 text-lg"
            >
              {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Sign In')}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            {isSignup ? 'Already have an account?' : "Don't have an account?"} {' '}
            <button 
              onClick={onSwitch} 
              className="text-violet-600 font-black cursor-pointer hover:underline bg-transparent border-none ml-1"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:flex flex-1 bg-slate-50 dark:bg-slate-900 items-center justify-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/10 blur-[100px] rounded-full"></div>
        <div className="text-center z-10">
          <div className="text-[120px] font-black tracking-tighter text-slate-200 dark:text-slate-800 select-none">
            LUMINA
          </div>
          <p className="text-slate-400 dark:text-slate-500 font-bold tracking-[0.2em] uppercase text-sm">
            AI Powered Summarization
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
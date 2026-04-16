import React, { useState, useEffect } from 'react';
import { useAppController } from './hooks/useAppController';

// Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Purpose from './components/Purpose';
import UseCase from './components/UseCase';
import CTA from './components/CTA';
import Footer from './components/Footer';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';
import { signOut } from './services/auth';

// Pages
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UploadPdf from './pages/UploadPdf';
import PasteText from './pages/PasteText';
import PasteLink from './pages/PasteLink';
import History from './pages/History'; 
import UploadImage from './pages/UploadImage'; // 1. Import the new Vision page

function AppContent() {
  const { loading: appLoading, isExiting, isDark, toggleTheme } = useAppController();
  const { user, loading: authLoading } = useAuth(); 
  const [view, setView] = useState('home');

  useEffect(() => {
    if (user) {
      if (view === 'home' || view === 'signup' || view === 'signin') {
        setView('dashboard');
      }
    } else {
      // 2. Added 'upload-image' to protected views
      const protectedViews = ['dashboard', 'upload-pdf', 'paste-text', 'paste-link', 'history', 'upload-image'];
      if (protectedViews.includes(view)) {
        setView('home');
      }
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      setView('home');
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  if (appLoading || authLoading) return <Preloader isExiting={isExiting} />;

  // Auth Views
  if (view === 'signup' || view === 'signin') {
    return (
      <Signup 
        view={view} 
        onSwitch={() => setView(view === 'signup' ? 'signin' : 'signup')} 
        onBack={() => setView('home')}
      />
    );
  }

  // App Functional Views
  if (view === 'upload-pdf') {
    return (
      <UploadPdf 
        user={user} 
        onBack={() => setView('dashboard')} 
        onLogout={handleLogout} 
      />
    );
  }

  if (view === 'paste-text') {
    return (
      <PasteText 
        user={user} 
        onBack={() => setView('dashboard')} 
        onLogout={handleLogout} 
      />
    );
  }

  if (view === 'paste-link') {
    return (
      <PasteLink 
        user={user} 
        onBack={() => setView('dashboard')} 
        onLogout={handleLogout} 
      />
    );
  }

  // 3. Register the Upload Image view
  if (view === 'upload-image') {
    return (
      <UploadImage 
        user={user} 
        onBack={() => setView('dashboard')} 
        onLogout={handleLogout} 
      />
    );
  }

  if (view === 'history') {
    return (
      <History 
        user={user} 
        onBack={() => setView('dashboard')} 
        onLogout={handleLogout} 
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <Dashboard 
        user={user} 
        onLogout={handleLogout} 
        onUploadClick={() => setView('upload-pdf')}
        onPasteClick={() => setView('paste-text')}
        onLinkClick={() => setView('paste-link')}
        onImageClick={() => setView('upload-image')} // 4. Pass the new handler
        onHistoryClick={() => setView('history')} 
      />
    );
  }

  // Home Landing Page
  return (
    <div className={`min-h-screen bg-white dark:bg-slate-950 transition-all duration-1000
                    ${isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      <Navbar 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        onSignupClick={() => setView('signup')} 
      />
      
      <main className="pt-24">
        <Hero onStartClick={() => setView('signup')} />
        
        <div id="features">
          <Features />
        </div>
        
        <div id="purpose">
          <Purpose />
        </div>
        
        <div id="use-case">
          <UseCase />
        </div>
        
        <div id="revise">
          <CTA onStartClick={() => setView('signup')} />
        </div>
        
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
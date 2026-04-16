import React, { useState } from 'react';
import { generateSummary } from '../services/ai';
import { saveSummary } from '../services/db';

const UploadImage = ({ user, onBack }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = async () => {
      setLoading(true);
      try {
        const base64Data = reader.result.split(',')[1];
        
        // 1. Generate Summary from Image
        const summary = await generateSummary(base64Data, true, selectedFile.type);
        setResult(summary);

        // 2. Save to Database (The Vault)
        await saveSummary(user.id, `Image: ${selectedFile.name}`, summary, 'image');
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-8">
      <button onClick={onBack} className="mb-8 text-slate-500 hover:text-violet-600">← Back</button>
      
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-black dark:text-white mb-4">Lumina Vision</h2>
        <p className="text-slate-500 mb-8">Upload a photo of your notes or a diagram for AI analysis.</p>

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="hidden" 
          id="imageInput"
        />
        <label 
          htmlFor="imageInput"
          className="cursor-pointer px-8 py-4 bg-violet-600 text-white rounded-2xl font-bold hover:bg-violet-700 transition-all inline-block"
        >
          {loading ? "Analyzing Pixels..." : "Select Image"}
        </label>

        {result && (
          <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] text-left border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-violet-600 mb-4">AI Insight:</h3>
            <div className="prose dark:prose-invert whitespace-pre-wrap dark:text-slate-300">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
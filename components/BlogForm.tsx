
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoogleGenAI } from "@google/genai";
import { createBlog } from '../services/api';
import { Button, Input, Textarea } from './ui-mock';
import { NewBlog } from '../types';

interface BlogFormProps {
  onSuccess: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewBlog>({
    title: '',
    category: [],
    description: '',
    date: new Date().toISOString(),
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000',
    content: '',
  });
  const [categoryInput, setCategoryInput] = useState('');

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      onSuccess();
    },
    onError: (err: any) => {
      setErrorMsg("Failed to publish: " + err.message);
    }
  });

  const generateAIContent = async () => {
    if (!formData.title) return alert("Please enter a title first.");
    
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const ai = new GoogleGenAI({ apiKey: (process as any).env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a professional blog post for a financial platform called CA Monk. 
        Title: ${formData.title}
        Description: ${formData.description || "General insights"}
        Requirements: High quality, informative, professional tone, roughly 300 words. No Markdown formatting, just plain text with paragraphs.`,
      });

      if (response.text) {
        setFormData(prev => ({ ...prev, content: response.text }));
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      setErrorMsg("AI content generation failed. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!formData.title || !formData.content) {
      setErrorMsg("Please fill in the title and content.");
      return;
    }
    mutation.mutate(formData);
  };

  const addCategory = () => {
    if (categoryInput.trim() && !formData.category.includes(categoryInput.trim().toUpperCase())) {
      setFormData(prev => ({
        ...prev,
        category: [...prev.category, categoryInput.trim().toUpperCase()]
      }));
      setCategoryInput('');
    }
  };

  const removeCategory = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.filter(c => c !== cat)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
          {errorMsg}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Blog Title</label>
        <Input 
          required
          placeholder="e.g., The Impact of New Tax Regulations"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Categories</label>
        <div className="flex gap-2">
          <Input 
            placeholder="Type and press Add..."
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
          />
          <Button variant="outline" onClick={addCategory} type="button">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.category.map(cat => (
            <span key={cat} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded border border-indigo-100 uppercase">
              {cat}
              <button type="button" onClick={() => removeCategory(cat)} className="hover:text-indigo-900 ml-1">&times;</button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Short Description</label>
        <Input 
          required
          placeholder="A quick summary for the preview..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">Full Content</label>
          <button 
            type="button" 
            onClick={generateAIContent}
            disabled={isGenerating || !formData.title}
            className="text-xs flex items-center gap-1 text-indigo-600 font-bold hover:text-indigo-700 disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
            )}
            Magic Write (AI)
          </button>
        </div>
        <Textarea 
          required
          placeholder="Start writing or use Magic Write..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full h-12 text-lg shadow-lg shadow-indigo-200"
          disabled={mutation.isPending || isGenerating}
        >
          {mutation.isPending ? 'Publishing...' : 'Publish Article'}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;

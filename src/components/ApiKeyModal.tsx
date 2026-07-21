import React, { useState } from 'react';
import { KeyRound, ExternalLink, X, ShieldCheck } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string, model: string) => void;
  currentKey: string;
  currentModel: string;
}

export const MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Recommended)' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' }
];

export function ApiKeyModal({ isOpen, onClose, onSave, currentKey, currentModel }: ApiKeyModalProps) {
  const [keyInput, setKeyInput] = useState(currentKey);
  const [modelInput, setModelInput] = useState(currentModel || MODELS[0].id);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(keyInput.trim(), modelInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D3A27]/40 backdrop-blur-sm">
      <div className="bg-[#FDFCF8] rounded-2xl shadow-xl border border-[#E8E4D9] w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-[#E8E4D9] bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#F1F8F0] rounded-lg">
              <KeyRound className="w-5 h-5 text-[#5E7A58]" />
            </div>
            <h2 className="text-xl font-serif font-semibold text-[#2D3A27]">API Settings</h2>
          </div>
          {currentKey && (
            <button onClick={onClose} className="p-1.5 text-[#A69F88] hover:text-[#4A5144] hover:bg-[#F9F7F2] rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium text-[#4A5144]">
              Google Gemini API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4D9] rounded-xl focus:ring-2 focus:ring-[#7A9D74] focus:border-[#7A9D74] outline-none transition-all text-[#4A5144]"
              required
            />
            <div className="flex items-center gap-1.5 text-xs text-[#8C897E] mt-2">
              <ShieldCheck className="w-4 h-4 text-[#5E7A58]" />
              <span>Stored locally in your browser. Never sent to our servers.</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="model" className="block text-sm font-medium text-[#4A5144]">
              Model Selection
            </label>
            <select
              id="model"
              value={modelInput}
              onChange={(e) => setModelInput(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-[#E8E4D9] rounded-xl focus:ring-2 focus:ring-[#7A9D74] focus:border-[#7A9D74] outline-none transition-all text-[#4A5144]"
            >
              {MODELS.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-[#F1F8F0] border border-[#7A9D74]/20 text-[#4A5A44] p-4 rounded-xl text-sm leading-relaxed">
            <p>
              This app uses your own API key to generate lists. Get a free key from{' '}
              <a 
                href="https://aistudio.google.com/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium underline underline-offset-2 hover:text-[#2D3A27] transition-colors"
              >
                Google AI Studio <ExternalLink className="w-3 h-3" />
              </a>.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#5E7A58] hover:bg-[#4A5A44] text-white font-medium rounded-xl transition-colors shadow-sm focus:ring-2 focus:ring-[#7A9D74] focus:ring-offset-2"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

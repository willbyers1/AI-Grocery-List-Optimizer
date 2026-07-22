/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ApiKeyModal, MODELS } from './components/ApiKeyModal';
import { Header } from './components/Header';
import { MealPlanInput } from './components/MealPlanInput';
import { GroceryListView } from './components/GroceryList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateGroceryList, GroceryCategory } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useLocalStorage('agl_optimizer_gemini_key', '');
  const [model, setModel] = useLocalStorage('agl_optimizer_model', MODELS[0].id);
  const [categories, setCategories] = useLocalStorage<GroceryCategory[]>('agl_optimizer_list', []);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveSettings = (key: string, selectedModel: string) => {
    setApiKey(key);
    setModel(selectedModel);
  };

  const handleGenerate = async (mealPlan: string) => {
    if (!apiKey) {
      setIsSettingsOpen(true);
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const newCategories = await generateGroceryList(apiKey, model, mealPlan);
      setCategories(newCategories);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleItem = (catIdx: number, itemIdx: number) => {
    const newCategories = [...categories];
    newCategories[catIdx].items[itemIdx].checked = !newCategories[catIdx].items[itemIdx].checked;
    setCategories(newCategories);
  };

  const handleUpdateItem = (catIdx: number, itemIdx: number, newName: string, newQuantity: string, newUnit: string) => {
    const newCategories = [...categories];
    const item = newCategories[catIdx].items[itemIdx];
    item.name = newName;
    item.quantity = newQuantity;
    item.unit = newUnit;
    setCategories(newCategories);
  };

  const handleDeleteItem = (catIdx: number, itemIdx: number) => {
    const newCategories = [...categories];
    newCategories[catIdx].items.splice(itemIdx, 1);
    setCategories(newCategories);
  };

  const handleClearList = () => {
    setCategories([]);
  };

  return (
    <div className="h-screen bg-[#FDFCF8] text-[#333C2E] font-sans selection:bg-[#7A9D74]/30 flex flex-col overflow-hidden">
      <Header 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        hasKey={!!apiKey} 
      />

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-[380px] lg:w-[420px] border-r border-[#E8E4D9] flex flex-col p-6 md:p-8 bg-[#F9F7F2] overflow-y-auto custom-scrollbar flex-shrink-0">
          {!apiKey && !isSettingsOpen && (
            <div className="bg-white/60 border border-[#E8E4D9] text-[#4A5144] p-5 rounded-2xl flex flex-col items-start gap-4 mb-6 shadow-sm">
              <div>
                <h2 className="font-serif font-medium text-lg mb-1 text-[#2D3A27]">Welcome to FreshList!</h2>
                <p className="text-sm text-[#8C897E]">Configure your Gemini API key to start turning your meal plans into organized shopping lists.</p>
              </div>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="w-full bg-[#5E7A58] hover:bg-[#4A5A44] text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-sm shadow-sm"
              >
                Setup API Key
              </button>
            </div>
          )}

          <MealPlanInput 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating} 
            hasKey={!!apiKey}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          {error && (
            <div className="mt-6 bg-[#FAF2F2] border border-[#8E5A5A]/20 text-[#8E5A5A] p-4 rounded-2xl flex items-start gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-serif font-medium">Generation Failed</h3>
                <p className="text-sm mt-1 opacity-90">{error}</p>
              </div>
            </div>
          )}
        </aside>

        <section className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto custom-scrollbar bg-[#FDFCF8]">
          <GroceryListView 
            categories={categories}
            onToggleItem={handleToggleItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            onClearList={handleClearList}
          />
        </section>
      </main>

      <footer className="bg-[#2D3A27] text-[#D9D5C8] px-6 sm:px-10 py-3 flex justify-between items-center text-[10px] font-medium tracking-wider uppercase flex-shrink-0">
        <div className="flex gap-4 sm:gap-6">
          <span className="hidden sm:inline">Local Encryption Active</span>
          <span className="opacity-50 hidden sm:inline">|</span>
          <span>Data strictly client-side</span>
        </div>
        <div className="flex gap-4">
          <span className="text-[#7A9D74] hidden sm:inline">
            API Key: {apiKey ? `...${apiKey.slice(-4)}` : 'Not Set'}
          </span>
          <button onClick={() => setIsSettingsOpen(true)} className="underline underline-offset-2 hover:text-white transition-colors">
            Settings
          </button>
        </div>
      </footer>

      <ApiKeyModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onSave={handleSaveSettings}
        currentKey={apiKey}
        currentModel={model}
      />
    </div>
  );
}

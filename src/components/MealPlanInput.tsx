import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface MealPlanInputProps {
  onGenerate: (mealPlan: string) => void;
  isGenerating: boolean;
  hasKey: boolean;
  onOpenSettings: () => void;
}

export function MealPlanInput({ onGenerate, isGenerating, hasKey, onOpenSettings }: MealPlanInputProps) {
  const [mealPlan, setMealPlan] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasKey) {
      onOpenSettings();
      return;
    }
    if (mealPlan.trim()) {
      onGenerate(mealPlan);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-[400px]">
      <div className="mb-6">
        <h2 className="text-lg font-serif font-medium text-[#4A5A44] mb-1">Weekly Meal Plan</h2>
        <p className="text-sm text-[#8C897E]">Describe your meals for the week below.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6">
        <div className="flex-1 relative">
          <textarea
            value={mealPlan}
            onChange={(e) => setMealPlan(e.target.value)}
            placeholder="Monday: Creamy pesto pasta with cherry tomatoes&#10;Tuesday: Lemon herb roasted chicken with asparagus&#10;Wednesday: Greek salad bowls with chickpeas..."
            className="w-full h-full min-h-[200px] p-6 rounded-2xl bg-white border border-[#E8E4D9] focus:ring-2 focus:ring-[#7A9D74] focus:border-[#7A9D74] focus:outline-none resize-none text-[#555] leading-relaxed shadow-sm custom-scrollbar"
            required
            disabled={isGenerating}
          />
          <div className="absolute bottom-4 right-4 pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest text-[#B4B0A3] font-bold">Free Text Mode</span>
          </div>
        </div>
        
        {!hasKey && (
          <div className="flex items-start gap-2 text-[#8E5A5A] bg-[#FAF2F2] border border-[#8E5A5A]/20 p-3 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>You need to configure your Gemini API key in Settings before generating a list.</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isGenerating || !mealPlan.trim()}
          className="w-full bg-[#5E7A58] hover:bg-[#4A5A44] disabled:bg-[#7A9D74]/50 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Optimizing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Optimize Shopping List</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

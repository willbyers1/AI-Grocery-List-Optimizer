import React from 'react';
import { Settings, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  hasKey: boolean;
}

export function Header({ onOpenSettings, hasKey }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 sm:px-10 py-4 sm:py-6 border-b border-[#E8E4D9] bg-[#FDFCF8]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#7A9D74] rounded-xl flex items-center justify-center text-white">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-serif font-semibold tracking-tight text-[#2D3A27]">FreshList <span className="text-[#7A9D74] italic">AI</span></h1>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#F1EFE6] rounded-full text-xs font-medium text-[#6B7260]">
          <div className={`w-2 h-2 rounded-full ${hasKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
          {hasKey ? 'API Key Configured' : 'Missing API Key'}
        </div>
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 hover:bg-[#F1EFE6] p-2 rounded-lg transition-colors text-[#6B7260] relative"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
          {!hasKey && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white sm:hidden" />
          )}
        </button>
      </div>
    </header>
  );
}

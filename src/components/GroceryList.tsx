import React, { useState } from 'react';
import { Check, Edit2, Copy, Trash2, Save, X } from 'lucide-react';
import { GroceryCategory, GroceryItem } from '../services/geminiService';

interface GroceryListProps {
  categories: GroceryCategory[];
  onToggleItem: (catIdx: number, itemIdx: number) => void;
  onUpdateItem: (catIdx: number, itemIdx: number, newName: string, newQuantity: string, newUnit: string) => void;
  onDeleteItem: (catIdx: number, itemIdx: number) => void;
  onClearList: () => void;
}

export function GroceryListView({ 
  categories, 
  onToggleItem, 
  onUpdateItem, 
  onDeleteItem,
  onClearList
}: GroceryListProps) {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', quantity: '', unit: '' });
  const [copied, setCopied] = useState(false);

  const startEdit = (item: GroceryItem) => {
    setEditingItemId(item.id);
    setEditForm({ name: item.name, quantity: item.quantity, unit: item.unit });
  };

  const cancelEdit = () => {
    setEditingItemId(null);
  };

  const saveEdit = (catIdx: number, itemIdx: number) => {
    onUpdateItem(catIdx, itemIdx, editForm.name, editForm.quantity, editForm.unit);
    setEditingItemId(null);
  };

  const copyToClipboard = () => {
    let text = "Grocery List\n\n";
    categories.forEach(cat => {
      if (cat.items.length === 0) return;
      text += `${cat.name}:\n`;
      cat.items.forEach(item => {
        text += `- ${item.checked ? '[x]' : '[ ]'} ${item.quantity} ${item.unit} ${item.name} ${item.notes ? `(${item.notes})` : ''}\n`;
      });
      text += '\n';
    });
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#A69F88] font-bold mb-2">Consolidated Results</div>
          <h2 className="text-3xl font-serif text-[#2D3A27]">The Grocery List</h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-serif text-[#7A9D74]">{totalItems}</div>
          <div className="text-[10px] uppercase text-[#A69F88] tracking-widest">Total Items</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {categories.map((cat, catIdx) => {
          if (cat.items.length === 0) return null;
          
          const catCheckedItems = cat.items.filter(i => i.checked).length;
          
          const colorThemes = [
            { text: 'text-[#5E7A58]', bg: 'bg-[#F1F8F0]', border: 'border-[#7A9D74]' },
            { text: 'text-[#A67C52]', bg: 'bg-[#FAF6F1]', border: 'border-[#A67C52]' },
            { text: 'text-[#8E5A5A]', bg: 'bg-[#FAF2F2]', border: 'border-[#8E5A5A]' },
            { text: 'text-[#4A5A44]', bg: 'bg-[#F1F4F0]', border: 'border-[#4A5A44]' },
          ];
          const theme = colorThemes[catIdx % colorThemes.length];

          return (
            <div key={cat.name} className="bg-white rounded-3xl p-6 border border-[#F0EEE6] shadow-sm flex flex-col h-fit">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F7F5EF]">
                <h3 className={`font-serif italic text-lg ${theme.text}`}>{cat.name}</h3>
                <span className={`text-xs font-semibold px-2 py-1 ${theme.bg} ${theme.text} rounded-md`}>
                  {catCheckedItems}/{cat.items.length} items
                </span>
              </div>
              
              <div className="space-y-3">
                {cat.items.map((item, itemIdx) => {
                  const isEditing = editingItemId === item.id;

                  return (
                    <div key={item.id} className="group flex items-center gap-3">
                      {!isEditing && (
                        <button
                          onClick={() => onToggleItem(catIdx, itemIdx)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            item.checked 
                              ? `${theme.bg} ${theme.border} bg-current text-white` 
                              : `border-[#D9D5C8] hover:${theme.border.replace('border-', 'border-')}`
                          }`}
                          style={{ backgroundColor: item.checked ? 'currentColor' : 'transparent', color: item.checked ? 'white' : 'transparent', borderColor: item.checked ? 'transparent' : '' }}
                        >
                          {item.checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </button>
                      )}

                      <div className="flex-grow min-w-0">
                        {isEditing ? (
                          <div className="flex flex-wrap gap-2">
                            <input
                              type="text"
                              value={editForm.quantity}
                              onChange={e => setEditForm({ ...editForm, quantity: e.target.value })}
                              className="w-16 px-2 py-1 text-sm border border-[#E8E4D9] rounded bg-white focus:outline-none focus:border-[#7A9D74]"
                              placeholder="Qty"
                            />
                            <input
                              type="text"
                              value={editForm.unit}
                              onChange={e => setEditForm({ ...editForm, unit: e.target.value })}
                              className="w-20 px-2 py-1 text-sm border border-[#E8E4D9] rounded bg-white focus:outline-none focus:border-[#7A9D74]"
                              placeholder="Unit"
                            />
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                              className="flex-grow min-w-[120px] px-2 py-1 text-sm border border-[#E8E4D9] rounded bg-white focus:outline-none focus:border-[#7A9D74]"
                              placeholder="Item name"
                            />
                          </div>
                        ) : (
                          <div className="cursor-pointer flex flex-wrap items-baseline gap-1" onClick={() => onToggleItem(catIdx, itemIdx)}>
                            <span className={`text-sm transition-colors ${item.checked ? 'text-[#A69F88] line-through' : 'text-[#4A5144]'}`}>
                              {item.name}
                            </span>
                            {(item.quantity || item.unit || item.notes) && (
                              <span className={`text-sm ${item.checked ? 'text-[#A69F88]/70' : 'text-[#A69F88]'}`}>
                                ({item.quantity} {item.unit}{item.notes ? ` - ${item.notes}` : ''})
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        {isEditing ? (
                          <div className="flex gap-1">
                            <button onClick={() => saveEdit(catIdx, itemIdx)} className="p-1 text-[#5E7A58] hover:bg-[#F1F8F0] rounded">
                              <Save className="w-4 h-4" />
                            </button>
                            <button onClick={cancelEdit} className="p-1 text-[#A69F88] hover:bg-[#F9F7F2] rounded">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <button onClick={() => startEdit(item)} className="p-1 text-[#A69F88] hover:text-[#5E7A58] hover:bg-[#F1F8F0] rounded transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDeleteItem(catIdx, itemIdx)} className="p-1 text-[#A69F88] hover:text-[#8E5A5A] hover:bg-[#FAF2F2] rounded transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-4 flex-wrap pb-8">
        <button onClick={copyToClipboard} className="flex-1 bg-white border border-[#E8E4D9] text-[#4A5144] font-medium py-3 rounded-xl hover:bg-[#F9F7F2] transition-colors flex items-center justify-center gap-2">
          <Copy className="w-5 h-5" />
          {copied ? 'Copied to Clipboard' : 'Share as Text'}
        </button>
        <button onClick={onClearList} className="flex-1 bg-white border border-[#E8E4D9] text-[#8E5A5A] font-medium py-3 rounded-xl hover:bg-[#FAF2F2] hover:border-[#8E5A5A]/30 transition-colors flex items-center justify-center gap-2">
          <Trash2 className="w-5 h-5" />
          Clear List
        </button>
      </div>
    </div>
  );
}

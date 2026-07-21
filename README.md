<h1 align="center">🛒 AI Grocery List Optimizer</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" alt="PRs Welcome" />
</p>

> Transform unstructured weekly meal plans into clean, deduplicated, aisle-categorized grocery shopping lists powered by Google Gemini AI.

---

## ✨ Features

- 🤖 **Smart AI Ingredient Merging**: Automatically combines overlapping ingredients across multiple recipes (e.g., 2 onions + 1 onion = 3 onions).
- 🏷️ **Aisle Categorization**: Intelligently groups items by supermarket sections like Produce, Dairy, Meat & Seafood, Pantry, Bakery, and Frozen.
- 🔑 **Bring Your Own Key (BYOK)**: Privacy-focused architecture storing your Google Gemini API key exclusively in your local browser storage.
- 📝 **Flexible Meal Input**: Supports free-form weekly descriptions, structured daily inputs, or optional full ingredient list uploads.
- 📱 **Interactive Mobile Shopping List**: Responsive, thumb-friendly checklist with persistent offline progress tracking and manual item editing.
- 📤 **Export & Share**: Quickly copy plain text summaries or print clean physical shopping checklists.

---

## 🛠️ Tech Stack

- [React 18+](https://react.dev/) - Client-side UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe application architecture
- [Vite](https://vitejs.dev/) - Fast frontend toolchain
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Google Gemini API](https://ai.google.dev/) - AI-powered structured text processing
- [Lucide React](https://lucide.dev/) - Modern UI icons

---

## 📁 Project Structure

```
ai-grocery-list-optimizer/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ApiKeyModal.tsx
│   │   ├── GroceryList.tsx
│   │   ├── ItemRow.tsx
│   │   ├── MealPlanInput.tsx
│   │   ├── Navbar.tsx
│   │   └── SettingsPanel.tsx
│   ├── services/
│   │   └── geminiService.ts
│   ├── types/
│   │   └── grocery.ts
│   ├── utils/
│   │   └── storage.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Quick Start & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mertbatubulbul/ai-grocery-list-optimizer.git
   cd ai-grocery-list-optimizer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Launch Development Server**
   ```bash
   npm run dev
   ```

---

## 🔑 API Key & Configuration

This application relies on Google Gemini API for list processing using a **BYOK (Bring Your Own Key)** architecture.

1. Obtain a free API key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Launch the application and paste your API key into the onboarding prompt or Settings modal.
3. Select your preferred Gemini model (e.g., `gemini-2.5-flash`).

> **🔒 Privacy Note**: Your API key is stored locally in your browser's `localStorage` (`agl_optimizer_gemini_key`). It is never transmitted to any third-party server and is sent directly to Google's official Gemini API endpoints.

---

## 🔄 How It Works

1. **Provide API Key**: Enter your Gemini API key in the settings panel.
2. **Input Meal Plan**: Type or paste your weekly meal plan in free-form or day-by-day structured fields.
3. **Generate List**: Click **Generate Grocery List** to send the plan to the Gemini API with structured JSON output instructions.
4. **Shop & Edit**: Review the deduplicated list organized by supermarket aisles, edit quantities, add custom items, or check items off while shopping.
5. **Export**: Copy the finalized list to your clipboard or print it for offline convenience.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Created By Mert Batu BULBUL**
* 🎓 AI Engineering & Full Stack Developer * 💻 React *

**Don't forget to star ⭐ this repo if you found it useful!**

</div>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/mertbatubulbul/ai-grocery-list-optimizer/issues).

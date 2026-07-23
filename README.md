<div align="center">

# 🥬 AI Grocery List Optimizer

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)

> Transform chaotic weekly meal plans into clean, deduplicated, aisle-categorized grocery lists instantly using Google Gemini AI.

</div>

---

## ⚡ Features

- 🤖 **Smart AI Ingredient Consolidation**: Parses unstructured meal plans or recipes and automatically merges duplicate ingredients (e.g., combining 2 onions from recipe A and 1 onion from recipe B into 3 onions).
- 🛒 **Aisle-By-Aisle Categorization**: Automatically organizes items into standard supermarket sections (Produce, Dairy, Meat & Seafood, Bakery, Pantry, Household, etc.).
- 🔒 **Privacy-First BYOK Architecture**: Bring Your Own Key model stores your Google Gemini API key exclusively in browser `localStorage`. No backend server or third-party data tracking.
- 📱 **Mobile-Optimized Shopping Mode**: Interactive checkboxes with thumb-friendly touch targets, persistent checked state, and item counters for smooth supermarket navigation.
- ✍️ **Flexible Editing & Exporting**: Add, edit, reorder, or delete items on the fly, and export your consolidated list as plain text or print-friendly layouts.
- 🌿 **Natural Tones UI Theme**: Elegant, calm interface styled with warm off-whites, sage green accents, and refined Cormorant Garamond typography.

---

## 🛠️ Tech Stack

- [React 18](https://react.dev/) - UI Component Framework
- [TypeScript](https://www.typescriptlang.org/) - Strict type safety for AI schemas and data models
- [Vite](https://vitejs.dev/) - Lightning-fast client-side build tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling with custom Natural Tones design tokens
- [Google Gemini API](https://ai.google.dev/) - High-performance AI model integration using client-side structured JSON mode

---

## 📁 Project Structure

```
ai-grocery-list-optimizer/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ApiKeyModal.tsx
│   │   ├── GroceryList.tsx
│   │   ├── Header.tsx
│   │   └── MealPlanInput.tsx
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── services/
│   │   └── geminiService.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Quick Start & Setup

Follow these steps to run the application locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/ai-grocery-list-optimizer.git
   cd ai-grocery-list-optimizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 🔑 API Key Setup & Security

This application uses a **Bring Your Own Key (BYOK)** model. You will need a free Google Gemini API key to perform AI list generations:

1. Obtain a free key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Open the application and enter your key in the onboarding modal or via the **Settings** gear icon in the header.
3. Choose your preferred Gemini model version (defaults to fast and efficient models like `gemini-2.0-flash`).

> **🔒 Privacy Note:** Your API key is stored strictly inside your browser's `localStorage` (`agl_optimizer_gemini_key`). It is never transmitted to any third-party server and is sent directly to Google's official API endpoints.

---

## 🔄 How It Works

1. **Enter Meal Plan**: Paste a free-form weekly meal plan or use the day-by-day structured input fields.
2. **Generate List**: Click **Generate Shopping List** to send your plan to the Gemini API formatted with a strict response schema.
3. **Review & Adjust**: View your auto-categorized list grouped by grocery store aisles. Edit items, quantities, or categories as needed.
4. **Go Shopping**: Open the web app on your phone, check off items as you walk through aisles, and track remaining items in real time.

---

## 📦 Building for Production

To build the static production assets:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Created By Mert Batu BULBUL**
* 🎓 AI Engineering & Full Stack Developer * 💻 React *

**Don't forget to star ⭐ this repo if you found it useful!**

</div>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request or issue report on the repository.

import { GoogleGenAI, Type, GenerateContentResponse } from '@google/genai';

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  notes: string;
  checked: boolean;
}

export interface GroceryCategory {
  name: string;
  items: GroceryItem[];
}

export interface GroceryListResult {
  categories: GroceryCategory[];
}

export async function generateGroceryList(
  apiKey: string,
  modelName: string,
  mealPlan: string
): Promise<GroceryCategory[]> {
  const ai = new GoogleGenAI({ apiKey });

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: modelName,
    contents: `Parse the following weekly meal plan and create a consolidated grocery shopping list. 
Infer typical ingredients if only dish names are provided.
Merge duplicate ingredients across all meals, combining quantities where units match. Note if units differ.
Categorize each merged ingredient into a standard grocery store aisle/category.
      
Meal Plan:
${mealPlan}`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          categories: {
            type: Type.ARRAY,
            description: "A list of grocery categories",
            items: {
              type: Type.OBJECT,
              properties: {
                name: {
                  type: Type.STRING,
                  description: "The name of the category, e.g., Produce, Dairy, Meat & Seafood",
                },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING, description: "Ingredient name" },
                      quantity: { type: Type.STRING, description: "Combined quantity, e.g., 3, 0.5" },
                      unit: { type: Type.STRING, description: "Unit of measurement, e.g., pieces, cups, lbs. Use empty string if none." },
                      notes: { type: Type.STRING, description: "Any additional notes or variations" }
                    },
                    required: ["name", "quantity", "unit", "notes"]
                  }
                }
              },
              required: ["name", "items"]
            }
          }
        },
        required: ["categories"]
      },
      systemInstruction: "You are an expert culinary assistant and grocery planner. Generate accurate, deduplicated, and well-categorized grocery lists.",
    }
  });

  const jsonStr = response.text || "{}";
  try {
    const data = JSON.parse(jsonStr) as GroceryListResult;
    
    // Assign unique IDs to items and default checked state
    return data.categories.map((cat, catIdx) => ({
      ...cat,
      items: cat.items.map((item, itemIdx) => ({
        ...item,
        id: `item-${catIdx}-${itemIdx}-${Date.now()}`,
        checked: false
      }))
    }));
  } catch (err) {
    console.error("Failed to parse Gemini response", err, jsonStr);
    throw new Error("Failed to parse the generated grocery list. Please try again.");
  }
}

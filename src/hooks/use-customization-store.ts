import { create } from "zustand";
import { nanoid } from "nanoid";

interface CustomizationState {
  key: string;
  selectedTheme: string | null;
  size: string;
  shape: string;
  layers: string;
  color: string;
  type: string;
  additionalNotes: string;
  generatedImage: string | null;
  setKey: () => void;
  setTheme: (theme: string) => void;
  setSize: (size: string) => void;
  setShape: (shape: string) => void;
  setLayers: (layers: string) => void;
  setType: (type: string) => void;
  setColor: (color: string) => void;
  setAdditionalNotes: (notes: string) => void;
  setGeneratedImage: (imageUrl: string | null) => void;
}

export const useCustomizationStore = create<CustomizationState>((set) => ({
  key: nanoid(),
  selectedTheme: null,
  size: "",
  shape: "Rectangle",
  layers: "Single-Tier",
  color: "#fff",
  type: "Icing",
  additionalNotes: "",
  generatedImage: null,
  setKey: () => set({ key: nanoid() }),
  setTheme: (theme) => set({ selectedTheme: theme }),
  setSize: (size) => set({ size }),
  setShape: (shape) => set({ shape }),
  setLayers: (layers) => set({ layers }),
  setColor: (color) => set({ color }),
  setType: (type) => set({ type }),
  setAdditionalNotes: (notes) => set({ additionalNotes: notes }),
  setGeneratedImage: (imageUrl) => set({ generatedImage: imageUrl }),
}));

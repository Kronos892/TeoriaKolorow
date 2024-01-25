import { atom, useAtom } from "jotai";

type Palette = {
  name: string;
  colors: string[];
};

const localStorageKey = "userPalettes";

// Helper function to retrieve palettes from local storage
const getUserPalettesFromLocalStorage = (): Palette[] => {
  const storedPalettesJSON = localStorage.getItem(localStorageKey);
  return storedPalettesJSON ? JSON.parse(storedPalettesJSON) : [];
};

// Initial palettes from local storage or the default array if not present
const initialPalettes: Palette[] =
  getUserPalettesFromLocalStorage().length > 0
    ? getUserPalettesFromLocalStorage()
    : [
        {
          name: "Serene Beach",
          colors: ["#5DA9AD", "#F2D1B3", "#EF857D", "#FFF5EE", "#34575C"],
        },
        {
          name: "Urban Sunrise",
          colors: ["#B8B0A3", "#FFD700", "#C0C0C0", "#B87333", "#6E7073"],
        },
        {
          name: "Enchanted Forest",
          colors: ["#697A5A", "#A88B9F", "#5A4E42", "#A3C1AD", "#4A556B"],
        },
        {
          name: "Vintage Americana",
          colors: ["#BB0A21", "#3F6C45", "#FFDB58", "#FAEBD7", "#343434"],
        },
      ];

export const palettesAtom = atom<Palette[]>(initialPalettes);

// Function to save palettes to local storage
export const savePalettesToLocalStorage = (palettes: Palette[]): void => {
  const palettesJSON = JSON.stringify(palettes);
  localStorage.setItem(localStorageKey, palettesJSON);
};

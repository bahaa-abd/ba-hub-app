import { transformFiled } from "utils/transforms";
import { DessertsByTime } from "./api/type";

// A set to store already used colors
const usedColors = new Set<string>();

const getRandomColorFromPalette = (): string => {
  const generateRandomColor = (): string => {
    // Explicitly define return type
    // Base hues for specific colors
    const baseHues = [
      0, // Red
      45, // Orange
      90, // Yellow
      135, // Green
      180, // Cyan
      225, // Blue
      270, // Purple
      315, // Magenta
      30, // Brown (approximated with a warm hue like yellow-orange)
    ];

    // Randomly select a base hue from the specified colors
    const baseHue = baseHues[Math.floor(Math.random() * baseHues.length)];

    // Add some variation around the base hue to ensure a variety of shades
    const hueVariation = Math.floor(Math.random() * 30) - 15; // Between -15 and +15
    const hue = Math.max(0, Math.min(360, baseHue + hueVariation)); // Ensure hue stays within [0, 360]

    // Saturation between 70% and 90% for vibrant colors
    const saturation = Math.floor(Math.random() * 20) + 70; // 70% to 90%

    // Lightness between 50% and 70% for vibrant pastel-like colors
    const lightness = Math.floor(Math.random() * 20) + 50; // 50% to 70%

    // Convert HSL to string
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // Check if the color has already been used
    if (usedColors.has(color)) {
      return generateRandomColor(); // If color is used, generate a new one
    } else {
      usedColors.add(color); // Mark color as used
      return color;
    }
  };

  return generateRandomColor();
};

// Format the data for BarChart
export const formatDessertsForChart = (
  dessertsByDay: DessertsByTime[] = []
) => {
  return dessertsByDay.map((day) => {
    const dayData: any = { date: day._id };

    // Loop through each dessert data for the day and add its revenue
    day.data.forEach((dessert) => {
      dayData[transformFiled(dessert.name)] = dessert.revenue;
    });
    return dayData;
  });
};

export const getColorForDesserts = (dessertsByDay: DessertsByTime[] = []) => {
  const colors: { [key: string]: string } = {};
  dessertsByDay.forEach((day) => {
    day.data.forEach((dessert) => {
      if (!colors[transformFiled(dessert.name)]) {
        colors[transformFiled(dessert.name)] = getRandomColorFromPalette(); // Assign a random color if it hasn't been assigned yet
      }
    });
  });
  return colors;
};

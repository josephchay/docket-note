export const COLORS = {
  black: "#191919",
  gray: "#a1a7b6",
  white: "#fffeff",
  yellow: "#ffcf7d",
  orange: "#f0a177",
  green: "#e6ee96",
  blue: "#55cffa",
  purple: "#b095f6",
  pink: "#f6a1d3",
  red: "#f4a3a3",
};

export const COLORS_NAMES = Object.fromEntries(
  Object.entries(COLORS).map(([key, value]) => [value, key])
);

export const NOTE_COLORS = {
  yellow: "#ffcf7d",
  orange: "#f0a177",
  green: "#e6ee96",
  blue: "#55cffa",
  purple: "#b095f6",
  pink: "#f6a1d3",
  red: "#f4a3a3",
}

export const NOTE_COLORS_NAMES = Object.fromEntries(
  Object.entries(NOTE_COLORS).map(([key, value]) => [value, key])
);

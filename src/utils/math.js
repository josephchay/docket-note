import { now } from "./date";

export const id = () => {
  return now() + "" + Math.floor(Math.random() * 80);
}

export const itemsPerFlexRow = (ref) => {
  const flex = Array.from(ref.current.children);
  const baseOffset = flex[0].offsetTop;
  const breakIndex = flex.findIndex(item => item.offsetTop > baseOffset);

  return (breakIndex === -1 ? flex.length : breakIndex);
}

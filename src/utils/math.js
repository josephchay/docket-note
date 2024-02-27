import { v4 as uuidv4 } from 'uuid';

export const id = () => {
  return uuidv4();
}

export const itemsPerFlexRow = (ref) => {
  const flex = Array.from(ref.current.children);
  const baseOffset = flex[0].offsetTop;
  const breakIndex = flex.findIndex(item => item.offsetTop > baseOffset);

  return (breakIndex === -1 ? flex.length : breakIndex);
}

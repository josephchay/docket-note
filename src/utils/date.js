export function getFormattedCurrentDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  return now.toLocaleDateString('en-US', options);
}

export function now() {
  return Date.now();
}

export function now() {
  return Date.now();
}

export function formattedDateNow() {
  const now = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  return now.toLocaleDateString('en-US', options);
}

export function formattedDateTimeNow() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return now.toLocaleDateString('en-US', options);
}

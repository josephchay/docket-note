export const randomQuote = (quotesArray) => {
  if (Array.isArray(quotesArray) && quotesArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex].quote;
  } else {
    return "Docket this note...";
  }
};

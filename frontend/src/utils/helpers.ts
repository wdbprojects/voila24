const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParams = searchParams.has(key);
  if (value && hasValueInParams) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasValueInParams) {
    searchParams.delete(key);
  }
  return searchParams;
};

const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return amount;
  });
};

export { getPriceQueryParams, generateAmountOptions };

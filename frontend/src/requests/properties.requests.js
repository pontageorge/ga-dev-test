export const getPropertiesWithTransactions = async (searchParam) => {
  const resp = await fetch(`/lrProperties/${searchParam}`);
  const json = await resp.json();

  if (json.success && json.lrProperties.length !== 0) return { data: json.lrProperties };

  return { fail: `No data can be returned for ${searchParam}` };
};

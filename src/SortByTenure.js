const SortByTenure = (data, sort = "High", tenure = "3Y") => {
  const dataCopy = JSON.parse(JSON.stringify(data));

  if (!data || !Array.isArray(data)) {
    return [];
  }

  const tenureMapping = {
    "1M": "monthly",    
    "6M": "halfyearly",
    "1Y": "yearly",
    "3Y": "threeYear",
    "5Y": "fiveYear",
    SI: "sinceInception",
  };

  const returnKey = tenureMapping[tenure];

  return dataCopy.sort((a, b) => {
    const returnA = a.stats?.returns?.[returnKey] || 0;
    const returnB = b.stats?.returns?.[returnKey] || 0;

    return sort === "High" ? returnB - returnA : returnA - returnB;
  });
};

export default SortByTenure;

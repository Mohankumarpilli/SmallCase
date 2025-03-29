const filterCheckBox = (data, filter) => {
  if (!Array.isArray(data)) return [];

  const resultSet = new Set();

  data.forEach((ele) => {
    if (filter.has("Include new smallcases") && ele.stats?.ratios?.marketCapCategory === "Small cap") {
      resultSet.add(ele);
    }
    if (ele.info?.investmentStrategy?.some((obj) => filter.has(obj.displayName))) {
      resultSet.add(ele);
    }
  });

  return Array.from(resultSet);
};

export default filterCheckBox;
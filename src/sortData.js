const sortData = (data, sort) => {
  const dataCopy = [...data];

  if (sort === "Popularity") {
    return dataCopy.sort((a, b) => {
      const rankA = a.brokerMeta?.flags?.popular?.rank || Infinity;
      const rankB = b.brokerMeta?.flags?.popular?.rank || Infinity;
      return rankA - rankB;
    });
  } else if (sort === "Minimum Amount") {
    return dataCopy.sort((a, b) => {
      const amountA = a.stats?.minInvestAmount || Infinity;
      const amountB = b.stats?.minInvestAmount || Infinity;
      return amountA - amountB;
    });
  }else if( sort === "Recently Rebalanced"){
    return dataCopy.sort( (a,b) => {
      const atime = a.info.lastRebalanced;
      const btime = b.info.lastRebalanced;
      return atime - btime;
    })
  }
  return data;
};

export default sortData;
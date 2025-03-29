const VolatilityButton = ({ handleVolatility, data, volatile }) => {
  const volatilityValue = `${data.des} Volatility`;
  
  return (
    <div
      className={
        volatile.has(volatilityValue)
          ? "flex flex-col justify-center items-center border-2 px-3 p-1 border-blue-700 rounded-l rounded-r"
          : "flex flex-col justify-center items-center border-1 px-3 p-1 border-gray-400 rounded-l rounded-r hover:border-blue-600"
      }
      onClick={() => handleVolatility(volatilityValue)}
    >
      <img src={`${data.id}.png`} className="h-8 w-8" alt="" />
      <p className="text-[13px] font-bold">{data.des}</p>
    </div>
  );
};

export default VolatilityButton;
const SubscriptionButton = ({ data, index, handleStockType, stocktype }) => {
  const values = data.split(" ");
  return (
    <button
      className={
        stocktype === data
          ? "py-2 font-bold text-[15px] leading-4 text-blue-500 border-1 px-2 border-blue-700 bg-blue-100"
          : stocktype == null && index == 0
          ? "py-2 font-bold text-[15px] leading-4 text-blue-500 border-1 px-2 border-blue-700 bg-blue-100"
          : "py-1 px-2 font-bold text-[15px] leading-4 text-gray-500"
      }
      onClick={() => handleStockType(data)}
    >
      {values[0]} <br /> {values[1]}
    </button>
  );
};

export default SubscriptionButton;

import React from "react";
const StockDetails = ({ data, tenure }) => {
  return (
    <section>
      {data.map((ele, index) => {
        let volatie;
        if (ele.stats.ratios.riskLabel === "Low Volatility") {
          volatie = { id: "1", des: "Low Volatility" };
        } else if (ele.stats.ratios.riskLabel === "Medium Volatility") {
          volatie = { id: "2", des: "Medium Volatility" };
        } else if (ele.stats.ratios.riskLabel === "High Volatility") {
          volatie = { id: "3", des: "High Volatility" };
        }
        let tenureobj = {
          "1M": ele.stats.returns.monthly,
          "6M": ele.stats.returns.halfyearly,
          "1Y": ele.stats.returns.yearly,
          "3Y": ele.stats.returns.threeYear,
          "5Y": ele.stats.returns.fiveYear,
        };
        const returnValue = tenureobj[tenure] || tenureobj["3Y"];
        return (
          <div
            key={index}
            className="flex py-2 pl-3 gap-7 border-b-1 border-gray-200 mb-2"
          >
            <img
              src={`https://assets.smallcase.com/images/smallcases/160/${ele.scid}.png`}
              alt={ele.info.name}
              className="w-15 h-15"
            />
            <div className="w-90 flex flex-col gap-1.5">
              <h3 className="text-l font-bold">
                {ele.info.name}
                <span className="text-[10px] m-2 text-blue-600">
                  {ele.flags.private ? "" : "FreeAccess"}
                </span>
              </h3>
              <span className="text-gray-700">{ele.info.shortDescription}</span>
              <p className="text-gray-400">by {ele.info.owner.name}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-gray-700">Min. Amount</span>
              <p>₹ {ele.stats.minInvestAmount}</p>
            </div>
            <div className="flex flex-col justify-center items-center pb-4">
              <p>{tenure || "3Y"} CAGR</p>
              <span className={returnValue.toFixed(2) >0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                {returnValue.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-center items-center pb-4">
              <img
                src={`${volatie.id}.png`}
                alt={volatie.des}
                className="mr-2"
              />
              <p>{volatie.des}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
export default StockDetails;
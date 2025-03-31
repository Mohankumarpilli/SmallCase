import "./App.css";
import StockDetails from "./StockDetails";
import data from "./GenerateData.js";
import CheckBoxComponent from "./CheckBoxComponent.jsx";
import RadioComponent from "./RadioComponent.jsx";
import VolatilityButtons from "./VolatilityButtons.jsx";
import { useEffect, useState } from "react";
import SubscriptionButton from "./SubscriptionsButton.jsx";
import Dropdown from "./DropDown.jsx";
import sortData from "./sortData.js";
import SortByTenure from "./SortByTenure.js";
import filterCheckBox from "./CheckboxFilter.js";

function App() {
  const [StockData, setStockData] = useState([]);
  const [volatile, setVolatile] = useState(new Set());
  const [stocktype, setStockType] = useState(null);
  const [selected, setSelected] = useState("Any");
  const [sortby, setSortBy] = useState("Popularity");
  const [tenure, setTenure] = useState(null);
  const [tenuresort, setTenureSort] = useState("High");
  const [checkbox, setCheckbox] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setStockData(data);
    setIsLoading(false);
  }, []);
  const Investment = [
    "Asset Allocation",
    "Corporate Governance",
    "Dividend",
    "ESG",
    "Factor Investing",
    "Fundamental",
    "Goal Based",
    "Growth",
    "Momentum",
    "Quality",
    "Quantamental",
    "Quantitative",
    "Sector Tracker",
    "Technical",
    "Thematic",
    "Value",
  ];

  const volatilityOptions = [
    { id: "1", des: "Low" },
    { id: "2", des: "Medium" },
    { id: "3", des: "High" },
  ];

  const Subscription = ["Show all", "Free access", "Fee based"];
  const under = ["Any", "Under ₹ 5000", "Under ₹ 25000", "Under ₹ 50000"];

  const handleClear = () => {
    setVolatile(new Set());
    setStockType(null);
    setSelected("Any");
    setCheckbox(new Set());
  };

  const handleCheckBox = (item) => {
    console.log(item);
    setCheckbox((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };

  const handleTenure = (selectedtenure) => {
    setSortBy(null);
    setTenure(selectedtenure);
  };

  const handleTenureSorting = (order) => {
    setTenureSort(order);
  };

  const handleDropDown = (sortbydata) => {
    setTenure(null);
    setSortBy(sortbydata);
  };

  const handleStockType = (type) => {
    setStockType((prev) =>
      prev === type ? null : type === "Show all" ? null : type
    );
  };

  const handleVolatility = (variable) => {
    setVolatile((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(variable)) {
        newSet.delete(variable);
      } else {
        newSet.add(variable);
      }
      return newSet;
    });
  };

  const handleChange = (choice) => {
    console.log(choice);
    setSelected(choice);
  };

  let displayStocks;
  if (volatile.size !== 0) {
    displayStocks = StockData.filter((ele) => {
      const type = ele.stats.ratios.riskLabel;
      return volatile.has(type);
    });
  } else {
    displayStocks = StockData;
  }

  if (stocktype != null) {
    if (stocktype === "Free access") {
      displayStocks = displayStocks.filter((ele) => !ele.flags.private);
    } else {
      displayStocks = displayStocks.filter((ele) => ele.flags.private);
    }
  }

  if (selected !== "Any") {
    const amount = parseInt(selected.split(" ")[2]);
    displayStocks = displayStocks.filter(
      (ele) => ele.stats.minInvestAmount < amount
    );
  }

  const sorteddata = sortData(displayStocks, sortby);
  if (sorteddata) {
    displayStocks = sorteddata;
  }
  if (tenure) {
    displayStocks = SortByTenure(displayStocks, tenuresort, tenure);
  }

  let filterCount = 0;

  if (selected && selected != "Any") {
    filterCount++;
  }
  if (stocktype != null) {
    filterCount++;
  }

  if (volatile.size > 0) {
    filterCount += volatile.size;
  }

  if (checkbox.size > 0) {
    filterCount += checkbox.size;
    displayStocks = filterCheckBox(displayStocks, checkbox);
  }
  return (
    <div className="items-center border-gray-400 rounded-l rounded-r">
      {/* NavBar */}
      <div className="navbar bg-base-100 shadow-sm px-90 flex justify-between">
        <div className="flex gap-7.5">
          <img src="smallcase.svg" className=" py-3.5" alt="samllcase" />
          <button className="text-l text-gray-700 py-3.5 border-b-1">
            Discover
          </button>
          <button className="text-l text-gray-700 py-3.5 font-sans">
            Create
          </button>
        </div>
        <div className="flex gap-8 justify-center items-center">
          <button className="text-l text-gray-700 py-3.5">Watchlist</button>
          <div className="border border-gray-200 text-md rounded-full w-6 h-6 bg-gray-500 relative text-white flex justify-center items-center">
            ?
            <span className="bg-blue-500 h-2 w-2 rounded-full absolute top-0 right-0 animate-ping"></span>
          </div>
          <button className="text-l border-1 w-25 h-10 mt-2 border-blue-500 rounded-full font-bold text-blue-600 shadow-sm">
            Login
          </button>
        </div>
      </div>
      {/* Main-Container */}
      <div className="px-90 py-7.5">
        <h1 className="text-2xl font-bold text-gray-700">Discover</h1>
        {/* Second-NavBar */}
        <div className="border-b-1 border-gray-300 mt-3 flex justify-between">
          <div className="flex gap-8">
            <button className="text-l text-gray-700 py-2.5">Collections</button>
            <button className="text-l text-blue-700 py-2.5 border-b-1 border-blue-700">
              All smallcases
            </button>
            <button className="text-l text-gray-700 py-2.5">Managers</button>
          </div>
          <div className="flex gap-4">
            <Dropdown
              sortby={sortby}
              handleDropDown={handleDropDown}
              handleTenure={handleTenure}
              tenure={tenure}
              handleTenureSorting={handleTenureSorting}
              tenuresort={tenuresort}
            />
          </div>
        </div>
        {/* Filters and Data */}
        <div className="grid grid-cols-[0.47fr_2fr] pt-6">
          {/* Filters */}
          <div className="flex flex-col gap-3">
            {/* Clear Filter */}
            <div className="flex justify-between border-b-1 border-gray-300">
              <div className="flex gap-2 justify-center py-3 border-gray-400 rounded-l rounded-r">
                <span>Filters</span>
                <p className="bg-gray-300 text-[14px] rounded-xs pt-0.46 px-1.5 h-5.5">
                  {filterCount}
                </p>
              </div>
              <button
                className="text-blue-600 font-bold text-[13px]"
                onClick={handleClear}
              >
                Clear All
              </button>
            </div>
            {/* Subscription Type */}

            <h2 className="font-bold text-gray-600">Subscription Type</h2>
            <div className="border-1 border-gray-200 rounded-sm flex justify-between">
              {Subscription.map((ele, index) => (
                <SubscriptionButton
                  data={ele}
                  key={index}
                  index={index}
                  handleStockType={handleStockType}
                  stocktype={stocktype}
                />
              ))}
            </div>
            {/* Investment Amount */}
            <h2 className="font-bold text-gray-600">Investment Amount</h2>
            <div className="flex flex-col gap-3 mb-3">
              <ul className="flex flex-col gap-3">
                {under.map((ele, index) => {
                  return (
                    <RadioComponent
                      data={ele}
                      key={index}
                      selected={selected}
                      handleChange={handleChange}
                    />
                  );
                })}
              </ul>
            </div>
            {/* Volatility */}
            <h2 className="font-bold text-gray-600">Volatility</h2>
            <div className="flex justify-around mb-2">
              {volatilityOptions.map((option) => (
                <VolatilityButtons
                  key={option.id}
                  handleVolatility={handleVolatility}
                  data={option}
                  volatile={volatile}
                />
              ))}
            </div>
            {/* Launch Date */}
            <h2 className="font-bold text-gray-600">Launch Date</h2>
            <CheckBoxComponent
              data={"Include new smallcases"}
              handleCheckBox={handleCheckBox}
              filter={checkbox}
            />
            {/* Investment Strategy */}
            <h2 className="font-bold text-gray-600">Investment Strategy</h2>
            <ul>
              {Investment.map((ele, index) => (
                <CheckBoxComponent
                  data={ele}
                  key={index}
                  handleCheckBox={handleCheckBox}
                  filter={checkbox}
                />
              ))}
            </ul>
          </div>
          {/* Data */}
          <div className="flex flex-col gap-2 pl-7">
            {/* Stocks Details */}
            <StockDetails data={displayStocks} tenure={tenure} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

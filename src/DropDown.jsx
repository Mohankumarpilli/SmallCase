import React, { useRef, useEffect, useState } from "react";

const Dropdown = ({ handleTenure, handleDropDown, sortby, tenure, handleTenureSorting, tenuresort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="flex gap-4">
      <div
        ref={dropdownRef}
        className="px-2 border-b-1 border-black relative w-60"
      >
        <div className="relative">
          <details
            className="dropdown mb-3"
            open={isOpen}
            onClick={toggleDropdown}
          >
            <summary className="btn m-1">
              {sortby ? sortby : "Popularity"}
            </summary>
            {isOpen && (
              <ul
                className="menu dropdown-content bg-base-100 bg-white rounded-box w-52 p-2 shadow-lg absolute z-50 top-full"
                onClick={handleInnerClick}
              >
                <li className="mb-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between px-2">
                      <label htmlFor="Popularity">Popularity</label>
                      <input
                        type="radio"
                        id="Popularity"
                        checked={"Popularity" === sortby}
                        onChange={() => handleDropDown("Popularity")}
                      />
                    </div>
                    <div className="flex justify-between px-2">
                      <label htmlFor="Minimum Amount">Minimum Amount</label>
                      <input
                        type="radio"
                        id="Minimum Amount"
                        checked={"Minimum Amount" === sortby}
                        onChange={() => handleDropDown("Minimum Amount")}
                      />
                    </div>
                    <div className="flex justify-between px-2">
                      <label htmlFor="Recently Rebalanced">
                        Recently Rebalanced
                      </label>
                      <input
                        type="radio"
                        id="Recently Rebalanced"
                        checked={"Recently Rebalanced" === sortby}
                        onChange={() => handleDropDown("Recently Rebalanced")}
                      />
                    </div>
                  </div>
                </li>
                <li className="px-2">Returns</li>
                <li className="flex flex-col gap-2 mt-2">
                  <label htmlFor="" className="px-2">
                    Time period
                  </label>
                  <div className="border-1 border-gray-300">
                    <button
                      className={
                        tenure === "1M"
                          ? "py-3 px-2 font-bold text-[15px] border-1 border-blue-700 leading-4 text-blue-500"
                          : "py-3 px-2 font-bold text-[15px] leading-4 text-gray-500"
                      }
                      onClick={() => handleTenure("1M")}
                    >
                      1M
                    </button>
                    <button
                      className={
                        tenure === "6M"
                          ? "py-3 px-2 font-bold text-[15px] border-1 border-blue-700 leading-4 text-blue-500"
                          : "py-3 px-2 font-bold text-[15px] leading-4 text-gray-500"
                      }
                      onClick={() => handleTenure("6M")}
                    >
                      6M
                    </button>
                    <button
                      className={
                        tenure === "1Y"
                          ? "py-3 px-2 font-bold text-[15px] border-1 border-blue-700 leading-4 text-blue-500"
                          : "py-3 px-2 font-bold text-[15px] leading-4 text-gray-500"
                      }
                      onClick={() => handleTenure("1Y")}
                    >
                      1Y
                    </button>
                    <button
                      className={
                        tenure === "3Y"
                          ? "py-3 px-2 font-bold text-[15px] border-1 border-blue-700 leading-4 text-blue-500"
                          : "py-3 px-2 font-bold text-[15px] leading-4 text-gray-500"
                      }
                      onClick={() => handleTenure("3Y")}
                    >
                      3Y
                    </button>
                    <button
                      className={
                        tenure === "5Y"
                          ? "py-3 px-2 font-bold text-[15px] border-1 border-blue-700 leading-4 text-blue-500"
                          : "py-3 px-2 font-bold text-[15px] leading-4 text-gray-500"
                      }
                      onClick={() => handleTenure("5Y")}
                    >
                      5Y
                    </button>
                  </div>
                </li>
                <li className="mt-3">
                  {tenure ? (
                    <div>
                      <button
                        className={ tenuresort == "High"? "px-3.5 py-1 border-1 border-blue-300 text-blue-500 font-bold text-[13px]" :
                           "px-3.5 py-1 border-1 border-gray-300 text-gray-500 font-bold text-[13px]"
                        }
                        onClick={() => handleTenureSorting("High")}
                      >
                        High - Low
                      </button>
                      <button
                        className={ tenuresort == "Low"? "px-3.5 py-1 border-1 border-blue-300 text-blue-500 font-bold text-[13px]" :
                            "px-3.5 py-1 border-1 border-gray-300 text-gray-500 font-bold text-[13px]"
                         }
                        onClick={() => handleTenureSorting("Low")}
                      >
                        Low - High
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            )}
          </details>
        </div>
      </div>

      <div className="px-2 border-b-1 border-black flex gap-2">
        <label htmlFor="sortby" className="py-2.5 text-gray-500">
          Search
        </label>
        <input
          type="text"
          name="sortby"
          id="sortby"
          className="py-2.5 text-black"
          placeholder="Smallcase, manager or a stock..."
        />
      </div>
    </div>
  );
};

export default Dropdown;

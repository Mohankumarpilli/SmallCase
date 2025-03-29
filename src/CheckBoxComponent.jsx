const CheckBoxComponent = ({ data, handleCheckBox, filter }) => {
  return (
    <div className="flex gap-2 mb-5">
      <input
        type="checkbox"
        id={data}
        onChange={() => handleCheckBox(data)}
        checked= {filter.has(data)}
      />
      <label htmlFor={data} className="text-gray-700">
        {data}
      </label>
    </div>
  );
};

export default CheckBoxComponent;
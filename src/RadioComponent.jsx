const RadioComponent = ({data, selected, handleChange}) => {
  return (
    <div className="flex gap-2">
      <input type="radio" id={data} checked={selected === data} onChange={() => handleChange(data)}/>
      <label htmlFor={data}>{data}</label>
    </div>
  );
};

export default RadioComponent;
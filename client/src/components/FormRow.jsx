const FormRow = ({ type, name, labelText, defaultValue, onChange, style }) => {
  return (
    <div className="form-row" style={style}>
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
      />
    </div>
  );
};
export default FormRow;

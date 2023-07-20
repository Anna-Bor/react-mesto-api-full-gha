function FormInput({
  id,
  name,
  type,
  placeholder,
  ariaLabel,
  value,
  onValueChange,
  additionalProps,
}) {
  return (
    <label className="form__input-holder">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value ?? ""}
        onChange={(e) => onValueChange(e.target.value)}
        className={`form__field form__field_name_${name}`}
        required="required"
        {...additionalProps}
      />
      <span className={`form__field-error ${id}-error`} />
    </label>
  );
}

export default FormInput;


export const Select = ({ label, name = '', items, labelClassName, ...props }) => (
  <>
    <label className={labelClassName} htmlFor={name}> {label} </label>
    <select name={name} {...props}>
      {items.map(item => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  </>
)
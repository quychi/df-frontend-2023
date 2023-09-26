
export const Input = ({ placeholder = '', onChange, ...props }) => {
  return (
    <input type="text" onChange={onChange} placeholder={placeholder} {...props}/>
  )
}

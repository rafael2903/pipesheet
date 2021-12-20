export function Checkbox({ name, checked, onChange, label }) {
  return (
    <label className='w-full text-left text-gray-600 text-sm flex items-start leading-4 py-1 gap-1'>
      <input
        name={name}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className=' w-4 h-4  leading-4'
      />
      {label}
    </label>
  )
}

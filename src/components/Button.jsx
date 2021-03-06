export function Button({
  variation = 'primary',
  className = '',
  disabled,
  ...rest
}) {
  const variations = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white disabled:cursor-not-allowed disabled:bg-blue-600',
    secondary:
      'text-blue-600 bg-white border border-gray-300 hover:bg-gray-100',
  }

  return (
    <button
      disabled={disabled}
      className={`${variations[variation]} ${className} text-lg w-full flex justify-center items-center h-11 rounded-lg px-4`}
      {...rest}
    />
  )
}

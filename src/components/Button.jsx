export default function Button({
  variation = 'primary',
  className = '',
  disabled,
  ...rest
}) {
  const variations = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white disabled:cursor-not-allowed disabled:bg-blue-600',
    secondary: 'text-gray-600',
  }

  return (
    <button
      disabled={disabled}
      className={`${variations[variation]} ${className} text-lg w-full h-11 rounded-lg px-4`}
      {...rest}
    />
  )
}

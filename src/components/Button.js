export default function Button({ variation = 'blue', ...rest }) {
  const variations = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    red: 'bg-red-600 hover:bg-red-700',
  }

  return (
    <button
      className={`${variations[variation]} text-white text-lg w-full rounded-lg py-2 px-4`}
      {...rest}
    />
  )
}

export default function TextInput({ ...rest }) {
  return (
    <input
      type="text"
      className={`text-lg border border-gray-300 rounded-lg py-2 px-4 my-4`}
      {...rest}
    />
  )
}

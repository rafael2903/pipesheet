export default function TextInput({ ...rest }) {
  return (
    <input
      type="text"
      className={`text-lg border focus:border-blue-600 focus:outline-none border-gray-300 w-full rounded-lg py-2 px-4 my-4`}
      {...rest}
    />
  )
}

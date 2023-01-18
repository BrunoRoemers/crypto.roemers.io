interface Props {
  name: React.InputHTMLAttributes<HTMLInputElement>["name"];
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}

const AddressInput = ({ name, value, onChange }: Props) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-8 p-1 border outline-none border-black focus:border-blue-600"
    />
  );
};

export default AddressInput;

import constants from "../../constants/constants";

interface Props {
  name: React.SelectHTMLAttributes<HTMLSelectElement>["name"];
  value: React.SelectHTMLAttributes<HTMLSelectElement>["value"];
  onChange: React.SelectHTMLAttributes<HTMLSelectElement>["onChange"];
}

const ChainSelect = ({ name, value, onChange }: Props) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-8 p-1 bg-transparent border border-black focus:border-blue-600"
    >
      {constants.supportedChains.map((supportedChain, i) => (
        <option value={supportedChain.chainId} key={i}>
          {supportedChain.name}
        </option>
      ))}
    </select>
  );
};

export default ChainSelect;

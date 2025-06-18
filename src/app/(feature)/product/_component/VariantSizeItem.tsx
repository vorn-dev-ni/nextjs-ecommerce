const VariantSizeItem = ({
  size,
  selected,
  onClick,
  disable,
}: {
  size?: string;
  selected: boolean;
  onClick: () => void;
  disable: boolean;
}) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={`border-2 w-fit px-2  hover:cursor-pointer ${
        selected ? "border-blue-500" : ""
      } ${disable ? "bg-gray-300 border-transparent" : ""}`}
    >
      <h5>{size}</h5>

      {/* {sizeVariant.qty <= 0 && (
      )} */}
    </button>
  );
};

export default VariantSizeItem;

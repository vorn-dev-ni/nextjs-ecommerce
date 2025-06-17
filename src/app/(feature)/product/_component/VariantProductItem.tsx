import Image from "next/image";

const VariantColorItem = ({
  image,
  selected,
}: {
  image?: string;
  selected: boolean;
}) => {
  return (
    <div
      className={`border-2 w-fit  hover:cursor-pointer ${
        selected ? "border-blue-500" : ""
      }`}
    >
      <Image
        alt={`product-image-${image}`}
        src={image ?? ""}
        priority
        width={50}
        height={50}
        className={`object-cover w-[45px] h-[45px] transition-transform duration-300 ease-in-out`}
      />
    </div>
  );
};

export default VariantColorItem;

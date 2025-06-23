"use client";
import { CategoryData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AvatarCategoryItem = ({ category }: { category: CategoryData }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/category?name=${category?.attributes?.name}`);
      }}
      className="aspect-square w-full hover:scale-110 transition-all ease-in-out duration-300 hover:cursor-pointer"
    >
      <Image
        className="w-full h-full rounded-full object-cover border-2 bg-gray-200"
        src={category?.attributes?.image?.data?.attributes?.url ?? "/app.png"}
        width={250}
        height={250}
        alt="Category Avatar"
        priority
      />
      <h6 className="text-center text-lg py-2 font-bold">
        {category?.attributes?.name}
      </h6>
    </div>
  );
};

export default AvatarCategoryItem;

export const dynamic = "force-dynamic";
import { getCategories } from "@/action/Category.action";
import AvatarCategoryItem from "./AvatarCategoryItem";

const CategoryAvatar = async () => {
  const categories = await getCategories();

  return (
    <section className="py-16  hidden md:block">
      <div className=" grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-16 grid">
        {categories?.data?.map((category, index) => (
          <AvatarCategoryItem key={index} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoryAvatar;

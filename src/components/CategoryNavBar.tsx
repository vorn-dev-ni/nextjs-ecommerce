"use server";
import { getCategories } from "@/action/Category.action";
import CategoryListing from "./CategoryListing";
const CategoryNavBar = async () => {
  const categories = await getCategories();

  return (
    <div
      className="mx-4 items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-sticky"
    >
      <CategoryListing categories={categories} />
    </div>
  );
};

export default CategoryNavBar;

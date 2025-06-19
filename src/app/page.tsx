export const dynamic = "force-dynamic";

import CategoryAvatar from "@/components/CategoryAvatar";
import NavBar from "@/components/NavBar";
import ProductMainSection from "@/components/ProductMain";
import PromotionSection from "@/components/PromoSection";

export default async function Home() {
  return (
    <div className="w-screen">
      <NavBar />
      <PromotionSection />
      <main className="flex flex-col items-center w-full min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryAvatar />
          <ProductMainSection />
        </div>
      </main>
    </div>
  );
}

import CategoryAvatar from "@/components/CategoryAvatar";
import LoadingSpinner from "@/components/LoadingSpinner";
import NavBar from "@/components/NavBar";
import ProductMainSection from "@/components/ProductMain";
import PromotionSection from "@/components/PromoSection";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="w-screen">
      <Suspense>
        <NavBar />
      </Suspense>

      <PromotionSection />
      <main className="flex flex-col items-center w-full min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<LoadingSpinner />}>
            <CategoryAvatar />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductMainSection />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

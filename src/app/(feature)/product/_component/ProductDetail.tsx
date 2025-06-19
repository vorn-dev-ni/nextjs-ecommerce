"use client";
import { Button } from "@/components/ui/button";
import { userAtom, userCartsAtom } from "@/lib/atom";
import { queryClient } from "@/lib/queryclient";
import { ProductData, ProductVariant } from "@/types";
import { useAtomValue } from "jotai";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { addItemToCart, updateQtyCart } from "../_action/Cart.action";
import ProductDetailImage from "./ProductDetailImage";
import RelatedProduct from "./RelatedProduct";
import VariantColorItem from "./VariantProductItem";
import VariantSizeItem from "./VariantSizeItem";
const ProductVariantDetail = ({
  product,
  productVariants,
}: {
  product: ProductData;
  productVariants: ProductVariant[];
}) => {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const userCarts = useAtomValue(userCartsAtom);

  const [mutatePage, setMutatePage] = useState({
    size: productVariants?.[0]?.attributes?.Sizes,
    color: productVariants?.[0]?.attributes?.color,
    imageUrl:
      productVariants?.[0]?.attributes?.image?.data?.attributes?.url ||
      product?.attributes?.images?.data?.attributes?.url,
    selectedPrice: productVariants?.[0]?.attributes?.price,
    salePrice: productVariants?.[0]?.attributes?.salePrice,
    totalAmt: 0,
    qty: 0,
    productId: productVariants?.[0]?.id,
    productVariants: productVariants[0],
    totalQty: productVariants?.[0]?.attributes?.qty,
  });
  function groupVariants(productVariants: ProductVariant[]) {
    const result: Record<string, any> = {};

    productVariants.forEach((variant) => {
      const attr = variant.attributes;
      const colorKey = attr.color;

      if (!result[colorKey]) {
        result[colorKey] = {
          color: colorKey,
          colorCode: attr.ColorCode,
          image: attr.image?.data?.attributes?.url || "",
          sizes: [],
        };
      }

      result[colorKey].sizes.push({
        size: attr.Sizes || attr.image?.data?.attributes?.url,
        sku: attr.sku,
        price: attr.price,
        salePrice: attr.salePrice,
        qty: attr.qty,
        productId: variant.id,
        fullVariant: variant,
      });
    });

    return Object.values(result);
  }

  const [isLoading, setLoading] = useState(false);
  const isAuth = useMemo(() => user?.token && user.userId, [user]);

  const handleAddtocart = async () => {
    if (!isAuth) {
      return router.push("/login");
    }
    if (mutatePage.qty <= 0) {
      toast("You cannot add item with 0 quantity", {
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: false,
        type: "error",
        draggable: false,
      });
      return;
    }

    setLoading(true);

    const preCarts = userCarts?.find((cart) => {
      return (
        cart.attributes?.product_variant?.data?.id ===
        mutatePage.productVariants?.id
      );
    });

    if (!preCarts) {
      const payload = {
        users_permissions_user: user?.userId ?? "",
        qty: mutatePage?.qty,
        product_variant: mutatePage?.productId,
        price: mutatePage?.selectedPrice,
        userId: user?.userId!,
        amt: mutatePage?.qty * mutatePage?.selectedPrice,
      };
      await addItemToCart(payload, user?.token ?? "");
    } else {
      const payload = {
        users_permissions_user: user?.userId ?? "",
        qty: mutatePage?.qty,
        product_variant: mutatePage?.productId,
        price: mutatePage?.selectedPrice,
        userId: user?.userId!,
        amt: mutatePage?.qty * mutatePage?.selectedPrice,
      };
      await updateQtyCart(preCarts?.id, payload, user?.token ?? "");
    }
    queryClient.invalidateQueries({ queryKey: ["userId", user?.userId] });

    setLoading(false);
    toast("Your item has been added to carts", {
      position: "top-center",
      autoClose: 1000,
      type: "success",
      draggable: false,
    });
  };
  const groupedVariants = groupVariants(productVariants);
  const categoryType =
    product?.attributes?.categories?.data?.[0]?.attributes?.name;

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 my-12">
      <ProductDetailImage selectedImageUrl={mutatePage?.imageUrl ?? ""} />
      <div className="main-detail">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          {product.attributes?.name}
        </h1>
        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
          <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
            ${mutatePage?.selectedPrice?.toFixed(2)}
          </p>
        </div>

        {!!productVariants?.length && (
          <div className="variant my-8 space-y-4">
            <div>
              <p className="md:text-lg text-md font-bold">Colors: </p>

              <section className="colors flex gap-4 flex-wrap">
                {groupedVariants.map((colorGroup, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      const firstSize = colorGroup.sizes[0];
                      setMutatePage({
                        productId: firstSize.productId,
                        imageUrl: colorGroup.image,
                        color: colorGroup.color,
                        salePrice: firstSize.salePrice,
                        selectedPrice: firstSize.price,
                        size: firstSize.size,
                        totalQty: firstSize.qty,
                        productVariants: firstSize.fullVariant,
                        qty: 0,
                        totalAmt: 0,
                      });
                    }}
                  >
                    <VariantColorItem
                      selected={mutatePage.color === colorGroup.color}
                      image={colorGroup.image}
                    />
                  </div>
                ))}
              </section>
            </div>

            <div>
              {product?.attributes?.product_variants?.data?.filter(
                (data) => data?.attributes?.Sizes
              ) &&
              product?.attributes?.product_variants?.data?.filter(
                (data) => data?.attributes?.Sizes
              ).length ? (
                <>
                  <p className="md:text-lg text-md font-bold">Sizes: </p>

                  <section className="sizes flex gap-4 flex-wrap">
                    {groupedVariants
                      .find((c) => c.color === mutatePage.color)
                      ?.sizes.map((sizeVariant: any, index: any) => (
                        <div key={index}>
                          <VariantSizeItem
                            disable={false}
                            selected={mutatePage.size === sizeVariant.size}
                            size={sizeVariant.size}
                            onClick={() => {
                              setMutatePage((pre) => ({
                                ...pre,
                                size: sizeVariant.size,
                                productId: sizeVariant.productId,
                                salePrice: sizeVariant.salePrice,
                                selectedPrice: sizeVariant.price,
                                totalQty: sizeVariant.qty,
                                productVariants: sizeVariant.fullVariant,
                                qty: 0,
                              }));
                            }}
                          />
                        </div>
                      ))}
                  </section>
                  {mutatePage.totalQty <= 0 && (
                    <p className="text-red-600 pb-2 my-2 font-bold">
                      Out of stock
                    </p>
                  )}
                </>
              ) : null}
            </div>
          </div>
        )}

        <div className="mt-6 gap-4 sm:gap-4 sm:items-center sm:flex sm:mt-8 ">
          <div className="flex items-center gap-2 mb-4">
            <Button
              disabled={mutatePage.qty <= 0}
              onClick={() => {
                if (mutatePage.qty > 0)
                  setMutatePage((pre) => ({
                    ...pre,
                    qty: pre.qty - 1,
                  }));
              }}
              className="hover:cursor-pointer text-md px-3 py-3 h-5 text-black bg-gray-200 hover:bg-gray-300"
            >
              -
            </Button>
            <p className="text-lg">{mutatePage.qty}</p>
            <Button
              onClick={() => {
                if (mutatePage.totalQty > mutatePage.qty)
                  setMutatePage((pre) => ({
                    ...pre,
                    qty: pre.qty + 1,
                  }));
              }}
              className="hover:cursor-pointer text-md px-3 py-3 h-5 text-black  bg-gray-200 hover:bg-gray-300"
            >
              +
            </Button>
          </div>
          <button
            disabled={isLoading}
            onClick={handleAddtocart}
            className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 gap-2"
            role="button"
          >
            <ShoppingCart className="space-x-1" />

            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add to cart"
            )}
          </button>
        </div>

        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

        <p className="mb-6 text-gray-500 dark:text-gray-400">
          {product?.attributes?.description ??
            "This product has no description."}
        </p>
      </div>

      <RelatedProduct
        category={categoryType ?? ""}
        currProductName={product?.attributes?.name ?? ""}
      />
    </div>
  );
};

export default ProductVariantDetail;

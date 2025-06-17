import axiosInstance from "@/lib/api";
import { CartResponse, ProductVariant } from "@/types";

export interface CartItem {
  id?: number;
  qty: number;
  product_variant: number;
}

export interface CartUser {
  id?: number;
  amt: number;
  items: CartItem[];
  users_permissions_user: number;
}

// export const updateCartItemQty = async (
//   cart: CartUser,
//   productVariantId: number,
//   newQty: number,
//   token: string
// ): Promise<CartUser | null> => {
//   try {
//     const updatedItems = cart.items.map((item) =>
//       item.product_variant === productVariantId
//         ? { ...item, qty: newQty }
//         : item
//     );

//     const updatedCart = {
//       amt: cart.amt,
//       items: updatedItems,
//       users_permissions_user: cart.users_permissions_user,
//     };

//     const res = await axiosInstance.put<{ data: CartUser }>(
//       `/cart-users/${cart.id}`,
//       { data: updatedCart },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return res.data.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
// export const deleteCartItem = async (
//   cart: CartUser,
//   productVariantId: number,
//   token: string
// ): Promise<CartUser | null> => {
//   try {
//     const updatedItems = cart.items.filter(
//       (item) => item.product_variant !== productVariantId
//     );

//     const updatedCart = {
//       amt: cart.amt,
//       items: updatedItems,
//       users_permissions_user: cart.users_permissions_user,
//     };

//     const res = await axiosInstance.put<{ data: CartUser }>(
//       `/cart-users/${cart.id}`,
//       { data: updatedCart },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return res.data.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export const addItemToCart = async (
  payload: {
    users_permissions_user: string;
    qty: number;
    product_variant: number;
    price: number;
    userId: string;
  },
  token: string
) => {
  try {
    const res = await axiosInstance.post<{ data: CartUser }>(
      `/cart-users`,
      { data: payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response data", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateQtyCart = async (
  cartId: number,
  payload: {
    users_permissions_user: string;
    qty: number;
    product_variant: number;
    price: number;
    userId: string;
  },
  token: string
) => {
  try {
    const res = await axiosInstance.put<{ data: CartUser }>(
      `/cart-users/${cartId}`,
      { data: payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Updated Response data", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteCart = async (cartId: any, token: String) => {
  try {
    const res = await axiosInstance.delete<{ data: CartUser }>(
      `/cart-users/${cartId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Updated Response data", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllUserCarts = async (userId: string, token: String) => {
  try {
    const res = await axiosInstance.get<CartResponse>(
      `/cart-users?filters[userId]=${userId}&populate[users_permissions_user]=*&populate[product_variant][populate][size]=*&populate[product_variant][populate][color]=*&populate[product_variant][populate][image][fields][0]=url`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data?.data;
  } catch (error) {
    console.error(error);
  }
};

// {
//   "data": {
//     "amt": 100,
//     "items": [
//       {
//         "qty": 1,
//         "product_variant": 1
//       },
//       {
//         "qty": 6,
//         "product_variant": 2
//       }
//     ],
//     "users_permissions_user": 1
//   }
// }

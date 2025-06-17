import React from "react";
import clsx from "clsx";

type OrderStatus = "processing" | "confirmed" | "completed";

interface OrderStatusBadgeProps {
  status?: OrderStatus;
}

const statusStyles: Record<
  OrderStatus,
  { bg: string; text: string; icon: JSX.Element }
> = {
  processing: {
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-800 dark:text-blue-300",
    icon: (
      <svg
        className="me-1 h-3 w-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <circle
          cx="8"
          cy="8"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
  confirmed: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-800 dark:text-green-300",
    icon: (
      <svg
        className="me-1 h-3 w-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M6 10.2 3.5 7.7 2.4 8.8 6 12.4 14 4.4 12.9 3.3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  completed: {
    bg: "bg-lime-100 dark:bg-lime-900",
    text: "text-lime-800 dark:text-lime-300",
    icon: (
      <svg
        className="me-1 h-3 w-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.5 10.5L3.5 7.5L2 9l4.5 4.5L14 6.5L12.5 5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
};

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status = "processing",
}) => {
  const style = statusStyles[status];

  return (
    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
        Status:
      </dt>
      <dd
        className={clsx(
          "me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium",
          style.bg,
          style.text
        )}
      >
        {style.icon}
        {status}
      </dd>
    </dl>
  );
};

export default OrderStatusBadge;

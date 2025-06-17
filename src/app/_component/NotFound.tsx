"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = ({
  code,
  title,
  desc,
  onPressButton,
  buttonTitle,
}: {
  code?: string;
  title?: string;
  desc?: string;
  onPressButton?: () => void;
  buttonTitle?: string;
}) => {
  const router = useRouter();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-28 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            {code || 404}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {title || `Something's missing.`}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {desc ||
              ` Sorry, we can't find that page. You'll find lots to explore on the
            home page.`}
          </p>

          {!buttonTitle ? (
            <Button
              className="bg-blue-600 hover:bg-blue-500"
              onClick={() => {
                onPressButton ? onPressButton() : router.replace("/");
              }}
            >
              {buttonTitle || "Back to Homepage"}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default NotFound;

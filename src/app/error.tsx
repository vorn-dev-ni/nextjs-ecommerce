"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";
import ErrorItem from "./_component/ErrorItem";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const onReset = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorItem onReset={onReset} />;
}

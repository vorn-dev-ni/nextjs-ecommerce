"use client";
import SecondaryNavBar from "@/components/SecondaryNavBar";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import ErrorItem from "./_component/ErrorItem";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const onReset = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <html>
      <body>
        <ErrorItem onReset={onReset} />
      </body>
    </html>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Breadcrumb({ className }: { className?: string }) {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter((segment) => segment.length > 0 && segment !== "category");

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      label: decodeURIComponent(segment),
      href,
      isLast: index === segments.length - 1,
    };
  });

  return (
    <nav
      className={cn(
        "flex items-center text-sm text-muted-foreground",
        className
      )}
    >
      <Link href="/" className="hover:underline text-blue-500">
        Home
      </Link>
      {crumbs.map((crumb, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="mx-2 h-4 w-4" />
          {crumb.isLast ? (
            <span className="text-foreground capitalize hover:cursor-pointer">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:underline text-blue-500 capitalize"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
export default Breadcrumb;

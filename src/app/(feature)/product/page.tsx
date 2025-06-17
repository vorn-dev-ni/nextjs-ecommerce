// app/somepage/page.tsx or page.jsx
import { redirect } from "next/navigation";

export default function Page() {
  return redirect("/category/all");
}

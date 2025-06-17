import { filterAtom } from "@/lib/atom";
import { useAtom } from "jotai";

const COLORS = [
  { label: "Red", value: "#f87171" },
  { label: "Blue", value: "#60a5fa" },
  { label: "Green", value: "#34d399" },
  { label: "Black", value: "#000000" },
  { label: "White", value: "#ffffff" },
];

export default function ColorFilter() {
  const [filters, setFilters] = useAtom(filterAtom);
  const toggleColor = (value: string) => {
    const currentColors = filters.color || [];
    if (currentColors.includes(value)) {
      setFilters((prev) => ({
        ...prev,
        color: currentColors.filter((c) => c !== value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        color: [...currentColors, value],
      }));
    }
  };

  return (
    <div className="bg-white rounded shadow">
      <div className="px-4 py-3 font-medium">Colors</div>
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        {COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => toggleColor(color.value)}
            title={color.label}
            className={`w-8 h-8 rounded-full border-2 focus:outline-none ${
              filters.color?.includes(color.value)
                ? "border-blue-600 ring-2 ring-blue-300"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
    </div>
  );
}

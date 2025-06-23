import { filterAtom } from "@/lib/atom";
import { useAtomValue } from "jotai";

const Paging = ({
  totalPages,
  goToPage,
}: {
  totalPages: number;
  goToPage: (page: number) => void;
}) => {
  const { page } = useAtomValue(filterAtom);
  if (totalPages <= 1) {
    return;
  }
  return (
    <div className="col-span-6 place-content-center justify-center place-items-center my-24">
      <nav aria-label="Page navigation">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={() => goToPage(Math.max((page ?? 1) - 1, 1))}
              disabled={(page ?? 1) === 1}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg 
  ${
    (page ?? 1) === 1
      ? "bg-gray-200 text-gray-400"
      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
  } disabled:bg-gray-100`}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => goToPage(page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight border 
    ${
      page === (page ?? 1)
        ? "bg-blue-50 text-blue-500 hover:to-blue-600"
        : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    }`}
              >
                {page}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => goToPage(Math.min((page ?? 1) + 1, totalPages))}
              disabled={(page ?? 1) === totalPages}
              className={`flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg  ${
                (page ?? 1) === totalPages
                  ? "bg-gray-200 text-gray-400"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              } disabled:bg-gray-100`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paging;

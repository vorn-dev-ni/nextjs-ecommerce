import { LoaderIcon } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <LoaderIcon
        className="animate-spin"
        size={48}
        strokeWidth={2}
        color="#2563eb"
      />
    </div>
  );
}

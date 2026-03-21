import { StarIcon } from "@/components/ui/Icons";

export default function StarRating({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/[0.18] bg-amber-400/10 text-amber-200"
        >
          <StarIcon className="h-4 w-4" />
        </span>
      ))}
    </div>
  );
}

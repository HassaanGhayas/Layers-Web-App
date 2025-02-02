import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="w-64 p-4 flex flex-col h-full border border-gray-300 hover:shadow-xl transition-all">
      {/* Skeleton for Product Image */}
      <div className="p-0 mb-4">
        <Skeleton className="w-full h-[200px] object-cover mix-blend-multiply bg-gray-100 aspect-square" />
      </div>

      {/* Skeleton for Content */}
      <div className="flex-grow p-0">
        <Skeleton className="h-5 w-full mb-2 rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>

      {/* Skeleton for Price and Discount */}
      <div className="flex items-center mt-auto gap-2 pt-4">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-14 rounded-md bg-red-100" />
      </div>
    </div>
  );
}

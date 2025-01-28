import { Skeleton } from "../ui/skeleton";

export function ServiceSkeleton() {
    return (
        <div className="w-full">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_0px_rgba(0,0,0,0.2)] overflow-hidden">
                <div className="relative aspect-[4/3]">
                    {/* Image Skeleton */}
                    <Skeleton className="w-full h-full" />

                    {/* Top Tags Skeleton */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Skeleton className="w-24 h-6 rounded-sm" />
                        <Skeleton className="w-32 h-6 rounded-sm" />
                    </div>
                </div>

                {/* Content Section Skeleton */}
                <div className="p-5">
                    {/* Title Skeleton */}
                    <Skeleton className="w-3/4 h-6 rounded-sm mb-4" />

                    {/* Destinations Skeleton */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {[...Array(3)].map((_, idx) => (
                            <Skeleton key={idx} className="w-16 h-4 rounded-sm" />
                        ))}
                    </div>

                    {/* Price and CTA Section Skeleton */}
                    <Skeleton className="w-full h-10 rounded-md" />
                </div>
            </div>
        </div>
    )
}

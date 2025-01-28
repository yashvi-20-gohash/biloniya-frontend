import { Skeleton } from "../ui/skeleton";

export function TestimonialSkeleton() {
    return (
        <div>
            <div className="p-8 bg-white rounded-2xl shadow-sm relative h-[220px]">
                {/* Description */}
                <Skeleton className="h-4 w-3/4 mx-auto rounded mb-6" />

                <div className="flex items-center justify-between mb-0 tesimonial-card">
                    <div className="gap-2">
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="w-4 h-4 rounded" />
                            ))}
                        </div>
                    </div>

                    <div className="text-left">
                        {/* Date */}
                        <Skeleton className="h-3 w-20 rounded mb-1" />
                        {/* Time */}
                        <Skeleton className="h-3 w-16 rounded" />
                    </div>
                </div>

                {/* Quote Icon */}
                <Skeleton className="absolute bottom-8 left-[42%] w-10 h-5 rounded" />
            </div>

            {/* User Info */}
            <div className="flex items-center justify-center gap-2 mt-8">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                    <Skeleton className="h-4 w-24 rounded mb-1" />
                    <Skeleton className="h-3 w-20 rounded" />
                </div>
            </div>
        </div>
    )
}

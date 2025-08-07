import { Skeleton } from "@/components/ui/skeleton"

export function ImageSkeleton() {
    return (
        <div className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    )
}

export function GridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <ImageSkeleton key={i} />
            ))}
        </div>
    )
}
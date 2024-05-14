import { Skeleton } from '@/Components/ui/skeleton'

function ProductDetailSkeleton() {
    return <div className="container grid grid-cols-2 mb-24 my-7">
        <Skeleton className="h-[500px] w-full mr-2" />

        <div className="ml-4">
            <Skeleton className="mb-4 h-12 w-full" />
            <Skeleton className="h-6 my-4 w-full" />
            <Skeleton className="h-6 my-4 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 my-4 w-full" />
            <Skeleton className="h-20 my-4 w-full" />
        </div>
    </div>
}

export default ProductDetailSkeleton
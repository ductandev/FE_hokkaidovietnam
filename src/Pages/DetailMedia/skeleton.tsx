import { Skeleton } from '@/Components/ui/skeleton'
import React from 'react'

function ArticleSkeleton() {
    return (
        <div className='md-container py-[80px]'>
            <Skeleton className="h-[60px] w-[30%]" />
            <Skeleton className="my-4 h-[20px] w-full" />
            <Skeleton className="my-4 h-[20px] w-full" />
        </div>
    )
}

export default ArticleSkeleton
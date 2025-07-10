'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation";

type Props = {
    params: {
        url: string
    }
}

export function UmkmPagination({ params: { url } }: Props) {
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '6';
    const currentPage = Number(page);

    // Create URL with search params
    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        params.set('per_page', per_page);
        return `${url}?${params.toString()}`;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>   
                
                {/* Show current page number */}
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>
                
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                
                <PaginationItem>
                    <PaginationNext href={createPageUrl(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
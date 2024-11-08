// 'use client';

// import { Button } from './button';
// import Link from 'next/link';
// import { usePathname, useSearchParams } from 'next/navigation';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   baseUrl: string;
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   baseUrl,
// }: PaginationProps) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const createPageUrl = (page: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('page', page.toString());
//     return `${baseUrl}&${params.toString()}`;
//   };

//   return (
//     <div className="flex justify-center gap-2 mt-8">
//       {currentPage > 1 && (
//         <Button asChild variant="outline">
//           <Link href={createPageUrl(currentPage - 1)}>Previous</Link>
//         </Button>
//       )}

//       {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//         <Button
//           key={page}
//           asChild
//           variant={page === currentPage ? 'default' : 'outline'}
//         >
//           <Link href={createPageUrl(page)}>{page}</Link>
//         </Button>
//       ))}

//       {currentPage < totalPages && (
//         <Button asChild variant="outline">
//           <Link href={createPageUrl(currentPage + 1)}>Next</Link>
//         </Button>
//       )}
//     </div>
//   );
// }
// src/components/ui/Pagination.tsx
"use client";

import { Button } from "./button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    return `${baseUrl.split("?")[0]}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Button asChild variant="outline">
          <Link href={createPageUrl(currentPage - 1)}>Previous</Link>
        </Button>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          asChild
          variant={page === currentPage ? "default" : "outline"}
        >
          <Link href={createPageUrl(page)}>{page}</Link>
        </Button>
      ))}

      {currentPage < totalPages && (
        <Button asChild variant="outline">
          <Link href={createPageUrl(currentPage + 1)}>Next</Link>
        </Button>
      )}
    </div>
  );
}

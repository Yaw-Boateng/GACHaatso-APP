import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number; // 0-indexed to match your spring boot backend context
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0}
        aria-label="Go to previous page"
        className="inline-flex items-center justify-center p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0e16] text-neutral-500 dark:text-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Meta Text Info */}
      <div className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/40">
        <span className="text-[11px] font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
          Page <span className="font-semibold text-neutral-900 dark:text-neutral-100">{currentPage + 1}</span> of <span className="font-semibold text-neutral-900 dark:text-neutral-100">{totalPages}</span>
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1}
        aria-label="Go to next page"
        className="inline-flex items-center justify-center p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0d0e16] text-neutral-500 dark:text-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all active:scale-95 cursor-pointer"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
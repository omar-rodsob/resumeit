"use client"

import { useTranslation } from "react-i18next";
import {paginationProps} from '@/app/tools/types';

export default function Pagination({pagination,onNext,onPrev}: paginationProps) {
  const { i18n, t } = useTranslation();

    return (
      <>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700"><span className="font-medium">{pagination.currentPage}</span> {t("pagination.pagOff")}{' '}
            <span className="font-medium">{pagination.total}</span>
          </p>
        </div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button type="button" className="m-1 relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer" onClick={onPrev} disabled={pagination.currentPage==1}>{t("pagination.pagPrev")}</button>
            <button type="button" className="m-1 relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer" onClick={onNext} disabled={pagination.currentPage==pagination.total}>{t("pagination.pagNext")}</button>
        </nav>
        </div>
      </>
    );
  }
  
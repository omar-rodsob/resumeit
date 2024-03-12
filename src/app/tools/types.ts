import { MouseEventHandler } from "react";

export type paginationProps={
    pagination: {
      currentPage: number;
      total: number;
    };
    onNext: MouseEventHandler<HTMLButtonElement>;
    onPrev: MouseEventHandler<HTMLButtonElement>;
  }
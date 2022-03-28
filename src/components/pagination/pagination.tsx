import { Pagination } from '@mui/material';
import React, { FunctionComponent } from 'react';

type PaginationProps = {
  pagesCount: number;
  page: number;
  className?: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const CustomPagination: FunctionComponent<PaginationProps> = ({ className, pagesCount, page, setPage, ...props }: PaginationProps) => {
  return <Pagination className={className} count={pagesCount} page={page} onChange={(_, num) => setPage(num)} {...props} variant='outlined' shape='rounded' />;
};

export default CustomPagination;

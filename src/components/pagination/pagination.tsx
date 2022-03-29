import { Pagination, PaginationItem } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

type PaginationProps = {
  pagesCount: number;
  page: number;
  className?: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const CustomPagination: FunctionComponent<PaginationProps> = ({ className, pagesCount, page, setPage, ...props }: PaginationProps) => {
  const changeHandler = (_: React.ChangeEvent<unknown>, num: number) => setPage(num);

  return (
    <Pagination
      className={className}
      count={pagesCount}
      page={page}
      onChange={changeHandler}
      {...props}
      variant='outlined'
      shape='rounded'
      // Добавляем какстомный item с возможностью роутинга, через компонент Link
      renderItem={(item) => <PaginationItem component={Link} to={`/todos/${item.page}`} {...item} />}
    />
  );
};

export default CustomPagination;

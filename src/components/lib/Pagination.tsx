import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import {
  setOffset,
  setPage,
  usePaginationStore,
} from '../../store/usePaginationStore';

interface Props {
  total: number;
}

const CustomPagination = styled(MuiPagination)(() => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  },
}));

const Pagination = ({ total }: Props) => {
  const PAGINATION_OFFSET = 20;

  const { page } = usePaginationStore(state => ({
    page: state.page,
    offset: state.offset,
  }));

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const newOffset = value > 1 ? (value - 1) * 20 : 0;
    setPage(value);
    setOffset(newOffset);
  };

  return total > 0 ? (
    <Stack spacing={2}>
      <CustomPagination
        page={page}
        count={Math.ceil(total / PAGINATION_OFFSET)}
        variant="outlined"
        size="large"
        color="primary"
        siblingCount={2}
        onChange={handlePageChange}
      />
    </Stack>
  ) : null;
};

export default Pagination;

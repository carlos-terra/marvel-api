import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import useCharacters from '../../hooks/useCharacters';
import useSeries from '../../hooks/useSeries';
import {
  usePaginationStore,
  setPage,
  setOffset,
} from '../../store/usePaginationStore';
import { useSearchStore } from '../../store/useSearchStore';

const CustomPagination = styled(MuiPagination)(() => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  },
}));

const Pagination = () => {
  const PAGINATION_OFFSET = 20;

  const { page, offset } = usePaginationStore(state => ({
    page: state.page,
    offset: state.offset,
  }));

  const searchName = useSearchStore(s => s.searchName);
  const searchType = useSearchStore(s => s.searchType);

  const { data: characterData } = useCharacters(offset, searchName);
  const { data: seriesData } = useSeries(offset, searchName);

  const total =
    searchType === 'characters' ? characterData?.total : seriesData?.total;

  const handlePageChange = (event, value: number) => {
    const newOffset = value > 1 ? (value - 1) * 20 : 0;
    setPage(value);
    setOffset(newOffset);
  };

  return total ? (
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

import { Character, Serie, ListData } from '../entities';
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import useCharacters from '../hooks/useCharacters';
import useSeries from '../hooks/useSeries';
import { setModalClosed, setSelectedItem } from '../store/useDetailsStore';
import { usePaginationStore } from '../store/usePaginationStore';
import { useSearchStore } from '../store/useSearchStore';
import Thumbnail from './Thumbnail';
import { UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 12,
  '&:hover div': {
    visibility: 'visible',
    cursor: 'pointer',
  },
}));

const Label = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  visibility: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  padding: '0.5em',
  borderRadius: 12,
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const List = () => {
  const offset = usePaginationStore(s => s.offset);
  const searchName = useSearchStore(s => s.searchName);
  const searchType = useSearchStore(s => s.searchType);

  let apiData:
    | UseQueryResult<ListData<Character>, AxiosError<unknown, any>>
    | UseQueryResult<ListData<Serie>, AxiosError<unknown, any>>;

  if (searchType === 'characters') {
    apiData = useCharacters(offset, searchName);
  } else {
    apiData = useSeries(offset, searchName);
  }

  const { data: listData, isLoading, isError, error } = apiData;
  const total = listData?.total || 0;

  const handleItemClick = (id: number) => {
    let selectedItem = listData?.data.find(
      (current: Character | Serie) => current.id === id
    );

    if (selectedItem) {
      setSelectedItem(selectedItem);
      setModalClosed(false);
    }
  };

  if (isError) return <div>Error: {(error as Error).message}</div>;

  if (!isLoading && (!listData || listData.data.length === 0)) {
    return <div>No items found</div>;
  }

  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <Masonry columns={{ xs: 2, sm: 3, lg: 4, xl: 5 }} spacing={2}>
        {listData && total > 0
          ? listData.data?.map((item: Character | Serie) => {
              return (
                <Item key={item.id} onClick={() => handleItemClick(item.id)}>
                  <Label> {'name' in item ? item.name : item.title}</Label>
                  <Thumbnail
                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    name={'name' in item ? item.name : item.title}
                  />
                </Item>
              );
            })
          : []}
      </Masonry>
    </Box>
  );
};

export default List;

import { Character, Serie, ListData, ApiBaseEntity } from '../entities';
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

type ItemsData = ListData<Character> | ListData<Serie> | undefined;

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

  const {
    data: charactersData,
    isLoading: isLoadingCharacters,
    isError,
    error,
  } = useCharacters(offset, searchName);

  const { data: seriesData, isLoading: isLoadingSeries } = useSeries(
    offset,
    searchName
  );

  const allLoaded = !isLoadingCharacters && !isLoadingSeries;

  const itemsData: ItemsData =
    searchType === 'characters' ? charactersData : seriesData;

  const handleItemClick = (id: number) => {
    let selectedItem = itemsData?.data.find(
      (current: Character | Serie) => current.id === id
    );

    if (selectedItem) {
      setSelectedItem(selectedItem);
      setModalClosed(false);
    }
  };

  if (isError) return <div>Error: {(error as Error).message}</div>;

  if (allLoaded && itemsData?.data.length === 0) {
    return <div>No items found</div>;
  }

  return (
    <>
      {allLoaded ? (
        <Box sx={{ width: '100%', marginTop: '20px' }}>
          <Masonry columns={{ xs: 2, sm: 3, lg: 4, xl: 5 }} spacing={2}>
            {itemsData!.data.map((item: Character | Serie) => {
              return (
                <Item key={item.id} onClick={() => handleItemClick(item.id)}>
                  <Label>{item.name}</Label>
                  <Thumbnail
                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    name={item.name}
                  />
                </Item>
              );
            })}
          </Masonry>
        </Box>
      ) : null}
    </>
  );
};

export default List;

import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Character, Serie } from '../entities';
import useCharacters from '../hooks/useCharacters';
import useSeries from '../hooks/useSeries';
import { setModalClosed, setSelectedItem } from '../store/useDetailsStore';
import { usePaginationStore } from '../store/usePaginationStore';
import { useSearchStore } from '../store/useSearchStore';
import Thumbnail from './Thumbnail';

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
  boxSizing: 'border-box',
  borderRadius: 12,
  fontSize: '1.1rem',
  fontWeight: 'bold',
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

  const listData =
    searchType === 'characters'
      ? charactersData?.characters
      : seriesData?.series;

  const handleItemClick = (id: number) => {
    let selectedItem = null;
    if (searchType === 'characters') {
      selectedItem = charactersData?.characters.find(
        current => current.id === id
      );
    } else if (searchType === 'series') {
      selectedItem = seriesData?.series.find(current => current.id === id);
    }
    if (selectedItem) setSelectedItem(selectedItem);
    setModalClosed(false);
  };

  if (isError) return <div>Error: {(error as Error).message}</div>;

  if (allLoaded && listData?.length === 0) {
    return <div className="mt-10">No results found</div>;
  }

  return (
    <>
      {allLoaded && listData && listData.length > 0 ? (
        <Box sx={{ width: '100%', marginTop: '20px' }}>
          <Masonry columns={{ xs: 2, sm: 3, lg: 4, xl: 5 }} spacing={2}>
            {listData.map(item => {
              let name: string;
              if (searchType === 'characters') {
                name = (item as Character).name;
              } else {
                name = (item as Serie).title;
              }
              return (
                <Item key={item.id} onClick={() => handleItemClick(item.id)}>
                  <Label>{name}</Label>
                  <Thumbnail
                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    name={name}
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

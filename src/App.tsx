import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { throttle } from 'lodash';
import './App.css';
import logo from './assets/marvel-logo.svg';
import Details from './components/Details';
import List from './components/List';
import Modal from './components/lib/Modal';
import Pagination from './components/lib/Pagination';
import useCharacters from './hooks/useCharacters';
import useSeries from './hooks/useSeries';
import {
  setSelectedCharacter,
  useCharacterStore,
} from './store/useCharacterStore';
import { usePaginationStore } from './store/usePaginationStore';
import {
  setSearchName,
  setSearchType,
  useSearchStore,
} from './store/useSearchStore';
import SearchFilter from './components/SearchFilter';
import { SearchType } from './entities';

function App() {
  const offset = usePaginationStore(s => s.offset);

  const selectedCharacter = useCharacterStore(s => s.selectedCharacter);

  const searchName = useSearchStore(s => s.searchName);

  const { data: charactersData, isLoading: isLoadingCharacters } =
    useCharacters(offset, searchName);

  const { data: seriesData, isLoading: isLoadingSeries } = useSeries(
    offset,
    searchName
  );

  const listTotal = charactersData?.total || seriesData?.total;

  const throttledHandleSearch = throttle(value => {
    setSearchName(value);
  }, 5000);

  const handleSearchType = (value: SearchType) => {
    setSearchType(value);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <img
        className="w-48 md:w-60 pt-4 pb-10 transition-all duration-500 hover:scale-110"
        src={logo}
        alt="Marvel"
      />
      <Box sx={{ width: '100%', marginBottom: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={searchName}
          onChange={e => throttledHandleSearch(e.target.value)}
          placeholder="What are you looking for?"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <SearchFilter
        onChange={e => handleSearchType(e.target.value as SearchType)}
      />
      {isLoadingCharacters || isLoadingSeries ? (
        <div className="flex justify-center items-start mx-auto w-full mt-10">
          <CircularProgress />
        </div>
      ) : (
        <>
          <List />
          {listTotal && (
            <div className="flex justify-center py-10">
              <Pagination />
            </div>
          )}
        </>
      )}
      <Modal
        open={!!selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      >
        <Details />
      </Modal>
    </div>
  );
}

export default App;

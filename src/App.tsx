import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { throttle } from 'lodash';
import './App.css';
import logo from './assets/marvel-logo.svg';
import Details from './components/Details';
import List from './components/List';
import SearchFilter from './components/SearchFilter';
import Modal from './components/lib/Modal';
import Pagination from './components/lib/Pagination';
import { Character, ListData, SearchType, Serie } from './entities';
import useCharacters from './hooks/useCharacters';
import useSeries from './hooks/useSeries';
import { setModalClosed, useDetailsStore } from './store/useDetailsStore';
import {
  setOffset,
  setPage,
  usePaginationStore,
} from './store/usePaginationStore';
import {
  setSearchName,
  setSearchType,
  useSearchStore,
} from './store/useSearchStore';
import styled from '@emotion/styled';
import { UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';

const RoundedTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 12px;
  }
`;

function App() {
  const offset = usePaginationStore(s => s.offset);
  const isModalClosed = useDetailsStore(s => s.isModalClosed);

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

  const throttledHandleSearch = throttle(value => {
    setSearchName(value);
    setPage(1);
    setOffset(0);
  }, 5000);

  const handleSearchType = (value: SearchType) => {
    setSearchType(value);
    setPage(1);
    setOffset(0);
  };

  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <img
        className="w-48 md:w-60 pt-4 pb-10 transition-all duration-500 hover:scale-110"
        src={logo}
        alt="Marvel"
      />
      <Box sx={{ width: '100%', marginBottom: 2 }}>
        <RoundedTextField
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
      {isLoading ? (
        <div className="flex justify-center items-start mx-auto w-full mt-10">
          <CircularProgress />
        </div>
      ) : total > 0 ? (
        <>
          <List />
          <div className="flex justify-center py-10">
            <Pagination total={total} />
          </div>
        </>
      ) : (
        <div className="pt-5">No items found</div>
      )}
      <Modal open={!isModalClosed} onClose={setModalClosed}>
        <Details />
      </Modal>
    </div>
  );
}

export default App;

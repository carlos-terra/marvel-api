import './App.css';
import logo from './assets/marvel-logo.svg';
import CharacterList from './components/CharacterList';
import Pagination from './components/Pagination';
import useCharacters from './hooks/useCharacters';
import CircularProgress from '@mui/material/CircularProgress';
import { usePaginationStore } from './store/usePaginationStore';

function App() {
  const offset = usePaginationStore(s => s.offset);
  const { isLoading } = useCharacters(offset);
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-start">
        <img
          className="w-48 md:w-60 pt-4 pb-10 transition-all duration-500 hover:scale-110"
          src={logo}
          alt="Marvel"
        />
        {isLoading && (
          <div className="flex justify-center items-start mx-auto w-full">
            <CircularProgress />
          </div>
        )}
      </div>
      <CharacterList />
      <div className="flex justify-center py-10">
        <Pagination />
      </div>
    </div>
  );
}

export default App;

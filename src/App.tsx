import './App.css';
import CharacterList from './components/CharacterList';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import logo from './assets/marvel-logo.svg';
import CharacterPagination from './components/CharactersPagination';
import UsePagination from './hooks/usePagination';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const { offset, setOffset } = UsePagination();

  const handlePageChange = (event, value) => {
    setOffset(value);
  };

  return (
    <>
      <div className="flex justify-center">
        <img
          className="w-64 md:w-80 pt-4 pb-10 transition-all duration-500"
          src={logo}
          alt="Marvel"
        />
      </div>
      <QueryClientProvider client={queryClient}>
        <CharacterList offset={offset} />
        <div className="flex justify-center py-10">
          <CharacterPagination onPageChange={handlePageChange} />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;

import './App.css';
import CharacterList from './components/CharacterList';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CharacterList />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

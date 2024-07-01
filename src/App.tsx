import './App.css';
import logo from './assets/marvel-logo.svg';
import CharacterList from './components/CharacterList';
import CharacterPagination from './components/CharactersPagination';
import Providers from './providers';

function App() {
  return (
    <>
      <div className="flex justify-center">
        <img
          className="w-64 md:w-80 pt-4 pb-10 transition-all duration-500"
          src={logo}
          alt="Marvel"
        />
      </div>
      <Providers>
        <CharacterList />
        <div className="flex justify-center py-10">
          <CharacterPagination />
        </div>
      </Providers>
    </>
  );
}

export default App;

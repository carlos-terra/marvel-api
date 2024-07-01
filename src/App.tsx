import './App.css';
import logo from './assets/marvel-logo.svg';
import CharacterList from './components/CharacterList';
import Pagination from './components/Pagination';
import Providers from './providers';

function App() {
  return (
    <>
      <div className="flex justify-center">
        <img
          className="w-48 md:w-72 pt-4 pb-10 transition-all duration-500 hover:scale-110"
          src={logo}
          alt="Marvel"
        />
      </div>
      <Providers>
        <CharacterList />
        <div className="flex justify-center py-10">
          <Pagination />
        </div>
      </Providers>
    </>
  );
}

export default App;

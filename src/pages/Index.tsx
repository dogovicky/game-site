import SideNav from '../components/global/SideNav';
import GameList from '../components/home/GameList';
import { useGameFilters } from '../hooks/useGameFilters';
import NavBar from '../components/global/NavBar';

const Index = () => {
  const { url, heading, genre, platform, setGenre, setPlatform, setDateFilter, setOrdering, search, setSearch } = useGameFilters();

  return (
    <div className="flex">
      <NavBar search={search} setSearch={setSearch} />
      {/* Sidebar - Hidden on small screens */}
      <SideNav setGenre={setGenre} setPlatform={setPlatform} setDateFilter={setDateFilter} setOrdering={setOrdering}/>

      {/* Main Content Area */}
      <main className="flex-1 ml-0 md:ml-64 px-4 md:px-8">
        <GameList url={url} heading={heading} genre={genre} platform={platform} setGenre={setGenre} setPlatform={setPlatform}/>
      </main>
    </div>
  );
};

export default Index;
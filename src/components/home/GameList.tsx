import { useFetch } from '../../hooks/useFetch';
import type { ApiResponse } from '../../types/Game';
import GameCard from './GameCard';
import HeroSection from './HeroSection';
import type { Option } from '../../hooks/useGameFilters';

type GameListProps = {
  url: string;
  heading: string;
  genre: Option | null;
  platform: Option | null;
  setGenre: (option: Option | null) => void;
  setPlatform: (option: Option | null) => void;
}

const GameList = ({ url, heading, genre, platform, setGenre, setPlatform }: GameListProps) => {
  const { data, error, loading } = useFetch<ApiResponse>(url);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section className='relative top-24'>
      <HeroSection heading={heading} genre={genre} platform={platform} setGenre={setGenre} setPlatform={setPlatform}/>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-10">
        {data?.results.map((game) => (
            <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}

export default GameList
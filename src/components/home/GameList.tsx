import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import type { ApiResponse } from '../../types/Game';
import GameCard from './GameCard';
import { API_URL } from '../../lib/constants';


const url =  API_URL + `&page_size=32`;

const GameList = () => {
  
  const { data, error, loading} = useFetch<ApiResponse>(url);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-10">
        {data?.results.map((game) => (
            <GameCard key={game.id} game={game} />
        ))}
    </div>

  );
}

export default GameList
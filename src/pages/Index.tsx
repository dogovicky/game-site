import React from 'react';
import SideNav from '../components/global/SideNav';
import HeroSection from '../components/home/HeroSection';
import GameList from '../components/home/GameList';

const Index = () => {
  return (
    <div className="flex">
      {/* Sidebar - Hidden on small screens */}
      <SideNav />

      {/* Main Content Area */}
      <main className="flex-1 ml-0 md:ml-64 px-4 md:px-8">
        <HeroSection
          title="Explore Games"
          description="Find your next favorite game by filtering through genres and platforms."
          platforms={[
            { id: 1, name: "PC" },
            { id: 2, name: "PlayStation" },
            { id: 3, name: "Xbox" },
            { id: 4, name: "Nintendo" },
          ]}
          genres={[
            { id: 1, name: "Action" },
            { id: 2, name: "Adventure" },
            { id: 3, name: "RPG" },
            { id: 4, name: "Shooter" },
          ]}
          onPlatformChange={(value) => console.log("Platform:", value)}
          onGenreChange={(value) => console.log("Genre:", value)}
        />
        <GameList />
      </main>
    </div>
  );
};

export default Index;

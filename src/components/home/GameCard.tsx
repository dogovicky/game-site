import { Card, CardHeader, CardContent, CardTitle } from "../ui/Card";
import type { Game } from "../../types/Game";
import { Star, Calendar } from "lucide-react";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import { MdPhoneIphone } from "react-icons/md";

interface GameCardProps {
  game: Game;
}

const getPlatformIcon = (platformSlug: string) => {
  switch (platformSlug) {
    case "pc":
      return { Icon: FaWindows, color: "text-blue-500" };
    case "playstation":
      return { Icon: FaPlaystation, color: "text-blue-600" };
    case "xbox":
      return { Icon: FaXbox, color: "text-green-500" };
    case "nintendo":
      return { Icon: SiNintendoswitch, color: "text-red-500" };
    case "mac":
      return { Icon: FaApple, color: "text-gray-400" };
    case "linux":
      return { Icon: FaLinux, color: "text-yellow-500" };
    case "ios":
      return { Icon: MdPhoneIphone, color: "text-gray-600" };
    case "android":
      return { Icon: FaAndroid, color: "text-green-600" };
    default:
      return { Icon: FaWindows, color: "text-gray-500" };
  }
};

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card className="overflow-hidden relative bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <CardHeader className="p-0">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {/* Platform Icons */}
        {game.parent_platforms && game.parent_platforms.length > 0 && (
          <div className="flex items-center gap-2">
            {game.parent_platforms.map((platformObj) => {
              const { Icon, color } = getPlatformIcon(platformObj.platform.slug);
              return (
                <Icon 
                  key={platformObj.platform.id} 
                  size={13} 
                  className={color}
                  title={platformObj.platform.name}
                />
              );
            })}
          </div>
        )}

        {/* Title */}
        <CardTitle className="text-xl text-left relative left-0 font-semibold">
          {game.name}
        </CardTitle>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star size={13} className="text-yellow-500" />
            <span className="text-xs">{game.rating?.toFixed(1) || "N/A"}</span>
          </div>

          {/* Release Date */}
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span className="text-xs">{game.released || "TBA"}</span>
          </div>
        </div>

        {/* Genres (Optional) */}
        {game.genres && game.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {game.genres.slice(0, 2).map((genre) => (
              <span key={genre.id} className="text-[0.65em] px-2 py-1 rounded-full bg-muted text-muted-foreground">
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameCard;
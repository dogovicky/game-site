import { Card, CardHeader, CardContent, CardTitle } from "../ui/Card";
import type { Game } from "../../types/Game";
import { Star, Calendar, Monitor, Gamepad2, Smartphone } from "lucide-react";
import { FaWindows, FaApple, FaLinux, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";

interface GameCardProps {
  game: Game;
}

const getPlatformIcon = (platform: string = "") => {
  switch (platform.toLowerCase()) {
    case "pc":
    case "windows":
      return FaWindows;
    case "mac":
    case "apple":
      return FaApple;
    case "linux":
      return FaLinux;
    case "playstation":
      return FaPlaystation;
    case "xbox":
      return FaXbox;
    case "nintendo switch":
    case "switch":
      return SiNintendoswitch;
    default:
      return FaWindows; // or a generic icon
  }
};

const GameCard = ({ game }: GameCardProps) => {
  // Icon mapping for platforms
//   const getPlatformIcon = (platform: string) => {
//     if (platform.includes("PC")) return Monitor;
//     if (platform.includes("PlayStation")) return Gamepad2;
//     if (platform.includes("Xbox")) return Gamepad2;
//     if (platform.includes("iOS") || platform.includes("Android")) return Smartphone;
//     return Gamepad2;
//   };

  return (
    <Card className="overflow-hidden bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <CardHeader className="p-0">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {/* {game.platforms && game.platforms.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
                {game.platforms.map((platformObj, index) => {
                    const PlatformIcon = getPlatformIcon(platformObj.platform.name || "Unknown");
                    return <PlatformIcon key={index} size={16} />;
                })}
            </div>
        )} */}


        {/* Title */}
        <CardTitle className="text-xl font-semibold line-clamp-1">
          {game.name}
        </CardTitle>

        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500" />
            <span>{game.rating || "N/A"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{game.released || "Unknown"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;

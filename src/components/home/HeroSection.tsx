import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "../ui/Select";

export type Option = {
  label: string;
  value: string;
}

const genres = [
  { label: "Action", value: "action" },
  { label: "Adventure", value: "adventure" },
  { label: "RPG", value: "rpg" },
  { label: "Strategy", value: "strategy" },
  { label: "Shooter", value: "shooter" },
  { label: "Puzzle", value: "puzzle" },
];

const platforms = [
  { label: "PC", value: "4" },
  { label: "PlayStation 5", value: "187" },
  { label: "PlayStation 4", value: "18" },
  { label: "Xbox One", value: "1" },
  { label: "Xbox Series X", value: "186" },
  { label: "Nintendo Switch", value: "7" },
];

type HeroSectionProps = {
  heading: string;
  genre: Option | null;
  platform: Option | null;
  setGenre: (option: Option | null) => void;
  setPlatform: (option: Option | null) => void;
}

const HeroSection = ({ heading, genre, platform, setGenre, setPlatform }: HeroSectionProps) => {
  const handleGenreChange = (value: string) => {
    if (value === "all") {
      setGenre(null);
    } else {
      const selectedGenre = genres.find(g => g.value === value);
      if (selectedGenre) {
        setGenre(selectedGenre);
      }
    }
  };

  const handlePlatformChange = (value: string) => {
    if (value === "all") {
      setPlatform(null);
    } else {
      const selectedPlatform = platforms.find(p => p.value === value);
      if (selectedPlatform) {
        setPlatform(selectedPlatform);
      }
    }
  };
  return (
    <section className="w-full relative mb-10 px-4 md:px-8">
      <div className="text-center md:text-left mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
          {heading}
        </h1>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
         <Select onValueChange={handleGenreChange} value={genre?.value || "all"}>
          <SelectTrigger className="w-full sm:w-[200px] bg-card text-foreground border border-border">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((g) => (
              <SelectItem key={g.value} value={g.value}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handlePlatformChange} value={platform?.value || "all"}>
          <SelectTrigger className="w-full sm:w-[200px] bg-card text-foreground border border-border">
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            {platforms.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  )
}


export default HeroSection;
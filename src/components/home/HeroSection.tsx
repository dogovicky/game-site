import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/Select";

interface HeroProps {
  title: string;
  description?: string;
  platforms: { id: number; name: string }[];
  genres: { id: number; name: string }[];
  onPlatformChange: (value: string) => void;
  onGenreChange: (value: string) => void;
}

const HeroSection = ({
  title,
  description,
  platforms,
  genres,
  onPlatformChange,
  onGenreChange,
}: HeroProps) => {
  return (
    <section className="w-full relative mb-10 px-4 md:px-8">
      {/* Heading + Description */}
      <div className="text-center md:text-left mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto md:mx-0">
            {description}
          </p>
        )}
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
        {/* Platform Filter */}
        <Select onValueChange={onPlatformChange}>
          <SelectTrigger className="w-full sm:w-[200px] bg-card text-foreground border border-border">
            <SelectValue placeholder="Select Platform" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map((platform) => (
              <SelectItem key={platform.id} value={platform.name}>
                {platform.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Genre Filter */}
        <Select onValueChange={onGenreChange}>
          <SelectTrigger className="w-full sm:w-[200px] bg-card text-foreground border border-border">
            <SelectValue placeholder="Select Genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.name}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default HeroSection;

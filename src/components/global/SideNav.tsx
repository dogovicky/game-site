import { useState } from 'react';
import { 
    CalendarCheck, Award, Gamepad2, Monitor, Trophy, Rocket, Clock, Star, Users, ArrowBigUp, Puzzle, Zap, Smartphone
} from 'lucide-react';
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import { MdPhoneIphone } from "react-icons/md";


const iconMap = {
    "Last 30 Days": Rocket,
    "This week": CalendarCheck,
    "Next Week": Clock,
    "Best of the year": Trophy,
    "Popular in 2025": Star,
    "All Time top 250": Award,
    "Windows": FaWindows,
    "Playstation 4": FaPlaystation,
    "XBox One": FaXbox,
    "Nintendo Switch": SiNintendoswitch,
    "iOS": MdPhoneIphone,
    "Linux": FaLinux,
    "Android": FaAndroid,
    "Action": Zap,
    "Racing": ArrowBigUp, 
    "Shooter": Users,
    "Sports": Trophy,
    "Puzzle": Puzzle,
    "Adventure": Rocket
} as const;

type SideNavProps = {
    setGenre: (option: { label: string; value: string } | null) => void;
    setPlatform: (option: { label: string; value: string } | null) => void;
    setDateFilter: (date: string) => void;
    setOrdering: (ordering: string) => void;
}

const SideNav = ({ setGenre, setPlatform, setDateFilter, setOrdering }: SideNavProps) => {
    const [activeLink, setActiveLink] = useState(""); 

    const sideNavLinks = [
        { 
            header: "New Releases", 
            type: "date" as const,
            links: [ 
                { name: "Last 30 Days", value: getLastThirtyDays() }, 
                { name: "This week", value: getThisWeek() }, 
                { name: "Next Week", value: getNextWeek() } 
            ] 
        },
        { 
            header: "Top", 
            type: "ordering" as const,
            links: [ 
                { name: "Best of the year", value: "-rating" }, 
                { name: "Popular in 2025", value: "-released" }, 
                { name: "All Time top 250", value: "-metacritic" } 
            ]
        },
        { 
            header: "Platforms", 
            type: "platform" as const,
            links: [ 
                { name: "Windows", value: "4" }, 
                { name: "Playstation 4", value: "18" }, 
                { name: "XBox One", value: "1" }, 
                { name: "Nintendo Switch", value: "7" }, 
                { name: "iOS", value: "3" }, 
                { name: "Android", value: "21" } 
            ]
        },
        { 
            header: "Genres", 
            type: "genre" as const,
            links: [ 
                { name: "Action", value: "action" }, 
                { name: "Racing", value: "racing" }, 
                { name: "Shooter", value: "shooter" }, 
                { name: "Sports", value: "sports" }, 
                { name: "Puzzle", value: "puzzle" }, 
                { name: "Adventure", value: "adventure" }
            ]
        }
    ];

    const handleLinkClick = (name: string, value: string, type: string) => {
        setActiveLink(name);
        
        // Clear other filters when clicking a new one
        setGenre(null);
        setPlatform(null);
        setDateFilter("");
        setOrdering("");

        // Apply the selected filter
        switch(type) {
            case 'genre':
                setGenre({ label: name, value });
                break;
            case 'platform':
                setPlatform({ label: name, value });
                break;
            case 'date':
                setDateFilter(value);
                break;
            case 'ordering':
                setOrdering(value);
                break;
        }
    };

    return (
        <nav className="side-nav fixed top-20 bottom-0 w-64 pt-6 pb-4 overflow-y-auto bg-background backdrop-blur-sm border-r border-border hidden md:block z-40 scrollbar-hide">
            
            <div className="px-4">
                {sideNavLinks.map((section, index) => (
                    <div key={index} className="mb-6">
                        <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2 px-2 tracking-wider">
                            {section.header}
                        </h3>

                        <ul className="space-y-1">
                            {section.links.map((link, linkIndex) => {
                                const IconComponent = iconMap[link.name] || Gamepad2;
                                const isActive = activeLink === link.name;

                                return (
                                    <li key={linkIndex}>
                                        <button 
                                            onClick={() => handleLinkClick(link.name, link.value, section.type)}
                                            className={`
                                                w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 
                                                ${isActive 
                                                    ? 'bg-primary/20 text-primary font-medium shadow-inner' 
                                                    : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                                                }
                                            `}>
                                            <IconComponent size={20} className={isActive ? 'text-primary' : 'text-muted-foreground/80'} />
                                            <span className="text-sm">{link.name}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            
            <div className="h-10"></div>
        </nav>
    );
};

// Helper functions to generate date ranges
function getLastThirtyDays(): string {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return `${formatDate(thirtyDaysAgo)},${formatDate(now)}`;
}

function getThisWeek(): string {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return `${formatDate(weekAgo)},${formatDate(now)}`;
}

function getNextWeek(): string {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return `${formatDate(now)},${formatDate(nextWeek)}`;
}

function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export default SideNav;
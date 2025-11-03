import { useState } from 'react';
import { 
    CalendarCheck, Award, Gamepad2, Monitor, Trophy, Rocket, Clock, Star, Users, ArrowBigUp, Puzzle, Zap, Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom'; 

const iconMap = {
    // New Releases
    "Last 30 Days": Rocket,
    "This week": CalendarCheck,
    "Next Week": Clock,

    // Top
    "Best of the year": Trophy,
    "Popular in 2025": Star,
    "All Time top 250": Award,

    // Platforms
    "Windows": Monitor,
    "Playstation 4": Gamepad2,
    "XBox One": Gamepad2, // Same icon for consistency
    "Nintendo Switch": Gamepad2,
    "iOS": Smartphone,
    "Android": Smartphone,

    // Genres
    "Action": Zap,
    "Racing": ArrowBigUp, 
    "Shooter": Users, // Users for competitive/multiplayer feel
    "Sporst": Trophy,
    "Puzzle": Puzzle,
    "Adventure": Rocket
};

const SideNav = () => {
    const [activeLink, setActiveLink] = useState(""); 

    const sideNavLinks = [
        { header: "New Releases", links: 
            [ { name: "Last 30 Days", href: "/filter/30days"}, { name: "This week", href: "/filter/week"}, { name: "Next Week", href: "/filter/nextweek"} ] },
        { header: "Top", links: 
            [ { name: "Best of the year", href: "/top/year"}, { name: "Popular in 2025", href: "/top/2025"}, { name: "All Time top 250", href: "/top/alltime"} ]},
        { header: "Platforms", links: 
            [ { name: "Windows", href: "/platform/windows"}, { name: "Playstation 4", href: "/platform/ps4"}, { name: "XBox One", href: "/platform/xboxone"}, 
                { name: "Nintendo Switch", href: "/platform/switch"}, { name: "iOS", href: "/platform/ios"}, { name: "Android", href: "/platform/android"} ]},
        { header: "Genres", links: 
            [ { name: "Action", href: "/genre/action"}, { name: "Racing", href: "/genre/racing"}, { name: "Shooter", href: "/genre/shooter"}, 
                { name: "Sports", href: "/genre/sports"}, { name: "Puzzle", href: "/genre/puzzle"}, { name: "Adventure", href: "/genre/adventure"}]}
    ];

    const handleLinkClick = (name: string, href: string) => {
        setActiveLink(name);
        console.log(`Filtering by: ${name} (${href})`);
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
                                const IconComponent = iconMap[link.name] || Gamepad2; // Default to Gamepad2
                                const isActive = activeLink === link.name;

                                return (
                                    <li key={linkIndex}>
                                        
                                        <Link to={link.href} onClick={(e) => {e.preventDefault(); handleLinkClick(link.name, link.href);}}
                                            className={`
                                                flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 
                                                ${isActive 
                                                    ? 'bg-primary/20 text-primary font-medium shadow-inner' 
                                                    : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                                                }
                                            `}>
                                            <IconComponent size={20} className={isActive ? 'text-primary' : 'text-muted-foreground/80'} />
                                            <span className="text-sm">{link.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            
            {/* Optional: Padding for the bottom for scrollability */}
            <div className="h-10"></div>
        </nav>
    );
};

export default SideNav;
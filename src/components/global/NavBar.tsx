import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { Search, Sun, Moon } from 'lucide-react'
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <motion.header initial={{ y: -100}} animate={{ y: 0}} className='fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md'>
        <div className='w-full px-6 py-4'>
          <div className='flex items-center justify-between gap-8'>
            <motion.h1 className='text-2xl font-extrabold bg-gradient-primary bg-clip-text text-transparent' whileHover={{ scale: 1.05}}>
              <Link to="/">Game Hub</Link>
            </motion.h1>

             <div className="flex items-center gap-2 flex-1 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <div className="relative w-full">
                <span className="absolute top-1/2 -translate-y-1/2 left-2">
                  <Search size={15} />
                </span>
                <Input
                  type="text"
                  placeholder="Search 500,000 games"
                  className="w-full rounded-lg pl-8 pr-3 py-2 outline-none focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="flex align-center gap-6">
              <Button asChild variant='outline'>
                <Link to='/login' className=''>Login</Link>
              </Button>
               <Button asChild variant="outline" className='bg-accent'>
                <Link to='/signup'>Sign Up</Link>
              </Button>
              <Button asChild onClick={toggleTheme} className='p-2 rounded'>
                { theme == "dark" ? <Sun /> : <Moon />}
              </Button>
            </div>
            
          </div>
        </div>
      </motion.header>
    </>
  )
}

export default NavBar
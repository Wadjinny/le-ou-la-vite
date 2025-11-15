import { useContext } from 'react'
import { Sun, Moon } from 'lucide-react'
import { ThemeContext } from '../context/theme'

export const NavBar = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="bg-slate-200 dark:bg-gray-800 text-center text-4xl py-4 border-b-2 border-slate-200 dark:border-gray-700 mb-3 transition-colors relative">
        <h1 className="text-4xl text-slate-600 dark:text-gray-200 font-light font-serif">Le ou La</h1>
        <button
          onClick={toggleTheme}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-6 h-6 text-slate-600 dark:text-gray-200" />
          ) : (
            <Sun className="w-6 h-6 text-slate-600 dark:text-gray-200" />
          )}
        </button>
    </div>  
  )
}

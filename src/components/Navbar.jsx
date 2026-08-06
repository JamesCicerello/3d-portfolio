import { NavLink } from "react-router-dom"


const Navbar = () => {
  return (
<header className="flex items-center justify-between px-6 py-4">    <NavLink
  to="/"
  className="group relative w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-black border border-slate-700 flex items-center justify-center shadow-2xl overflow-hidden transition-all duration-500 hover:scale-110"
>
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

  <span className="relative text-2xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
    JC
  </span>
</NavLink>
<nav className="flex text-lg gap-7 font-medium ">
<NavLink to="/about" className={({ isActive }) => (isActive ? 'text-primary-500' : 'text-light-3 hover:text-primary-500 transition-colors duration-300')}>About</NavLink>
<NavLink to="/projects" className={({ isActive }) => (isActive ? 'text-primary-500' : 'text-light-3 hover:text-primary-500 transition-colors duration-300')}>Projects</NavLink>
<NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-primary-500' : 'text-light-3 hover:text-primary-500 transition-colors duration-300')}>Contact</NavLink>

</nav>
    </header>
  )
}

export default Navbar
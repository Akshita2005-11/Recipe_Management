import { BookHeart, Heart, Plus } from 'lucide-react'

function Navbar() {
	return <header className="site-header">
		<a className="brand" href="/" aria-label="Mise home">
			<span className="brand-mark"><BookHeart size={19} strokeWidth={1.8} /></span>
			<span>mise<span className="brand-period">.</span></span>
		</a>
		<nav className="main-nav" aria-label="Main navigation">
			<a href="/" className={window.location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Discover</a>
			<a href="/favorites" className={window.location.pathname === '/favorites' ? 'nav-link active' : 'nav-link'}><Heart size={15} /> Saved</a>
		</nav>
		<a className="add-link" href="/add-recipe"><Plus size={17} strokeWidth={2.5} /><span>Add a recipe</span></a>
	</header>
}

export default Navbar

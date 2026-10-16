import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, Search, Sparkles } from 'lucide-react'
import RecipeCard from '../components/RecipeCard.jsx'
import { useRecipes } from '../context/useRecipes.js'

const categories = ['Everything', 'Breakfast', 'Lunch', 'Dinner', 'Dessert']

function Home() {
	const [category, setCategory] = useState('Everything')
	const [query, setQuery] = useState('')
	const { recipes, favorites, toggleFavorite } = useRecipes()
	const featured = recipes.find((recipe) => recipe.id === 'mango-crispy-rice-salad') || recipes[0]
	const filtered = useMemo(() => recipes.filter((recipe) => {
		const matchesCategory = category === 'Everything' || recipe.category === category
		const search = query.toLowerCase().trim()
		const matchesSearch = !search || `${recipe.title} ${recipe.description} ${recipe.category}`.toLowerCase().includes(search)
		return matchesCategory && matchesSearch
	}), [recipes, category, query])

	return <div className="home-page">
		<section className="welcome-band">
			<div className="welcome-inner">
				<div className="welcome-copy"><span className="eyebrow"><Sparkles size={14} /> THE MISE RECIPE COLLECTION</span><h1>Cook with<br /><em>intention.</em></h1><p>Thoughtful recipes for slow mornings, generous tables, and everything worth sharing.</p><a className="text-link" href="#the-recipes">Explore the collection <ArrowDown size={15} /></a></div>
				{featured && <a className="featured-tile" href={`/recipe/${featured.id}`}>
					<img src={featured.image} alt={featured.title} />
					<span className="featured-overlay"><span className="featured-label">Selected for your table</span><strong>{featured.title}</strong><span className="featured-more">View recipe <ArrowRight size={15} /></span></span>
				</a>}
			</div>
		</section>

		<section className="recipe-section page-shell" id="the-recipes">
			<div className="section-heading"><div><span className="eyebrow">A COLLECTION FOR EVERY OCCASION</span><h2>Browse the recipes</h2></div><span className="recipe-count">{filtered.length} recipes</span></div>
			<div className="recipe-tools"><div className="category-tabs" role="group" aria-label="Filter recipes by category">{categories.map((item) => <button key={item} className={category === item ? 'category-tab selected' : 'category-tab'} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-box"><Search size={17} /><input aria-label="Search recipes" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a recipe..." /><kbd>/</kbd></label></div>
			{filtered.length ? <div className="recipe-grid">{filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} isFavorite={favorites.includes(recipe.id)} onToggleFavorite={toggleFavorite} />)}</div> : <div className="empty-state"><span className="empty-icon">✳</span><h3>No recipes on this page yet.</h3><p>Try another search, or add the first one yourself.</p><a className="button-primary" href="/add-recipe">Add a recipe <ArrowRight size={16} /></a></div>}
		</section>
		<footer className="site-footer"><span>mise<span className="brand-period">.</span></span><span>Good food, thoughtfully gathered.</span><a href="/add-recipe">Contribute a recipe <ArrowRight size={14} /></a></footer>
	</div>
}

export default Home

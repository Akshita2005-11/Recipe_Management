import { ArrowRight, Heart } from 'lucide-react'
import RecipeCard from '../components/RecipeCard.jsx'
import { useRecipes } from '../context/useRecipes.js'

function Favourites() {
	const { recipes, favorites, toggleFavorite } = useRecipes()
	const savedRecipes = recipes.filter((recipe) => favorites.includes(recipe.id))

	return <section className="saved-page page-shell">
		<div className="saved-heading"><span className="saved-icon"><Heart size={20} fill="currentColor" /></span><span className="eyebrow">THE KEEPERS</span><h1>Your saved recipes<span>.</span></h1><p>The ones you want to come back to.</p></div>
		{savedRecipes.length ? <div className="recipe-grid">{savedRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} isFavorite onToggleFavorite={toggleFavorite} />)}</div> : <div className="empty-state saved-empty"><span className="empty-icon"><Heart size={24} /></span><h3>A little room for the good ones.</h3><p>Tap the heart on any recipe and it’ll be waiting here.</p><a className="button-primary" href="/">Explore recipes <ArrowRight size={16} /></a></div>}
	</section>
}

export default Favourites

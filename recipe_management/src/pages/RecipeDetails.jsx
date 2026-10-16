import { ArrowLeft, Bookmark, Clock3, CookingPot, Users } from 'lucide-react'
import { useRecipes } from '../context/useRecipes.js'

function RecipeDetails() {
	const { recipes, favorites, toggleFavorite } = useRecipes()
	const id = decodeURIComponent(window.location.pathname.split('/').filter(Boolean).at(-1) || '')
	const recipe = recipes.find((item) => item.id === id)

	if (!recipe) return <section className="not-found page-shell"><span className="eyebrow">NOT IN THE RECIPE BOX</span><h1>We couldn't find that one<span>.</span></h1><a className="button-primary" href="/">Back to the recipes <ArrowLeft size={16} /></a></section>

	const isFavorite = favorites.includes(recipe.id)
	return <article className="details-page page-shell">
		<a className="back-link" href="/"><ArrowLeft size={16} /> All recipes</a>
		<div className="details-hero"><img src={recipe.image} alt={recipe.title} /><div className="details-title"><span className="eyebrow">{recipe.category.toUpperCase()} · {recipe.difficulty.toUpperCase()}</span><h1>{recipe.title}<span>.</span></h1><p>{recipe.description}</p><div className="details-stats"><span><Clock3 size={16} /> {recipe.time} minutes</span><span><Users size={16} /> Serves {recipe.servings}</span></div><button className={`save-recipe ${isFavorite ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(recipe.id)}><Bookmark size={16} fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'Saved to your keepers' : 'Save this recipe'}</button></div></div>
		<div className="recipe-instructions"><section className="ingredients-panel"><div className="details-section-title"><span className="section-number">01</span><h2>What you'll need</h2></div><ul className="ingredient-list">{recipe.ingredients.map((ingredient, index) => <li key={`${ingredient}-${index}`}><span className="ingredient-check" aria-hidden="true"></span>{ingredient}</li>)}</ul></section><section className="method-panel"><div className="details-section-title"><span className="section-number">02</span><h2>Let's make it</h2><CookingPot size={20} /></div><ol className="method-list">{recipe.steps.map((step, index) => <li key={`${step}-${index}`}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></section></div>
		<a className="back-link details-bottom-link" href="/"><ArrowLeft size={16} /> Back to the recipe box</a>
	</article>
}

export default RecipeDetails

import { ArrowUpRight, Clock3, Heart } from 'lucide-react'

function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
	return <article className={`recipe-card tone-${recipe.color || 'green'}`}>
		<a className="card-image-link" href={`/recipe/${recipe.id}`} aria-label={`Open ${recipe.title}`}>
			<img className="card-image" src={recipe.image} alt={recipe.title} loading="lazy" />
			<span className="card-category">{recipe.category}</span>
		</a>
		<button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} onClick={() => onToggleFavorite(recipe.id)} aria-label={isFavorite ? `Remove ${recipe.title} from saved recipes` : `Save ${recipe.title}`} title={isFavorite ? 'Remove from saved' : 'Save recipe'}>
			<Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
		</button>
		<div className="card-copy">
			<a href={`/recipe/${recipe.id}`} className="card-title-link"><h3>{recipe.title}</h3><ArrowUpRight className="card-arrow" size={17} /></a>
			<p>{recipe.description}</p>
			<div className="card-meta"><span><Clock3 size={14} /> {recipe.time} min</span><span>{recipe.difficulty}</span></div>
		</div>
	</article>
}

export default RecipeCard

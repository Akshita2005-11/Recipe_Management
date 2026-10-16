import { useState } from 'react'
import { ArrowLeft, ImagePlus } from 'lucide-react'

function RecipeForm({ onSubmit }) {
	const [image, setImage] = useState('')

	function handleSubmit(event) {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const recipe = {
			title: data.get('title').trim(),
			category: data.get('category'),
			image: image.trim() || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85',
			time: Number(data.get('time')),
			servings: Number(data.get('servings')),
			difficulty: data.get('difficulty'),
			description: data.get('description').trim(),
			ingredients: data.get('ingredients').split('\n').map((item) => item.trim()).filter(Boolean),
			steps: data.get('steps').split('\n').map((item) => item.trim()).filter(Boolean),
		}
		onSubmit(recipe)
	}

	return <section className="form-page page-shell">
		<a className="back-link" href="/"><ArrowLeft size={16} /> Back to recipes</a>
		<div className="form-heading"><span className="eyebrow">A good thing starts here</span><h1>Pass it around<span>.</span></h1><p>Write down the one you always get asked to share.</p></div>
		<form className="recipe-form" onSubmit={handleSubmit}>
			<div className="form-section-title"><span>01</span><div><h2>The good stuff</h2><p>Give your recipe a name and a little context.</p></div></div>
			<label className="field field-wide">Recipe name<input name="title" placeholder="e.g. Sunday tomato butter beans" required maxLength="70" /></label>
			<label className="field field-wide">A little about it<textarea name="description" placeholder="What makes this one special?" rows="2" required maxLength="180" /></label>
			<div className="field-row">
				<label className="field">Category<select name="category" defaultValue="Dinner"><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Dessert</option><option>Snack</option><option>Drink</option></select></label>
				<label className="field">Difficulty<select name="difficulty" defaultValue="Easy"><option>Easy</option><option>Medium</option><option>Project</option></select></label>
			</div>
			<div className="field-row">
				<label className="field">Prep + cook time (min)<input name="time" type="number" min="1" max="999" placeholder="30" required /></label>
				<label className="field">Servings<input name="servings" type="number" min="1" max="99" placeholder="4" required /></label>
			</div>
			<label className="field field-wide image-field"><span>Photo URL <span className="optional">optional</span></span><span className="input-with-icon"><ImagePlus size={17} /><input value={image} onChange={(event) => setImage(event.target.value)} type="url" placeholder="https://..." /></span></label>
			<div className="form-section-title form-section-spaced"><span>02</span><div><h2>Make it happen</h2><p>One ingredient or step per line.</p></div></div>
			<label className="field field-wide">Ingredients<textarea name="ingredients" placeholder={'2 cans butter beans\n3 garlic cloves\nA generous glug of olive oil'} rows="6" required /></label>
			<label className="field field-wide">Method<textarea name="steps" placeholder={'Warm the olive oil in a pan.\nAdd garlic and cook until fragrant.\nTaste, season, and share.'} rows="7" required /></label>
			<button className="button-primary submit-recipe" type="submit">Save this recipe <ArrowLeft className="submit-arrow" size={17} /></button>
		</form>
	</section>
}

export default RecipeForm

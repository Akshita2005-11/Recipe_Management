import RecipeForm from '../components/RecipeForm.jsx'
import { useRecipes } from '../context/useRecipes.js'

function Addrecipe() {
	const { addRecipe } = useRecipes()
	function handleAdd(recipe) {
		const created = addRecipe(recipe)
		window.location.assign(`/recipe/${created.id}`)
	}
	return <RecipeForm onSubmit={handleAdd} />
}

export default Addrecipe

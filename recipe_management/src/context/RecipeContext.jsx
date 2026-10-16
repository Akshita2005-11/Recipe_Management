import { useEffect, useState } from 'react'
import { RecipeContext } from './useRecipes.js'
const STORAGE_KEY = 'mise-recipes-v1'

const starterRecipes = [
	{
		id: 'lemon-ricotta-pancakes', title: 'Lemon ricotta pancakes', category: 'Breakfast',
		image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=85',
		time: 25, servings: 3, difficulty: 'Easy', color: 'peach',
		description: 'Cloud-soft middles, crisp golden edges, and a little lemon brightness in every bite.',
		ingredients: ['1 cup all-purpose flour', '¾ cup whole milk', '½ cup ricotta', '2 large eggs', '1 lemon, zested', '2 tbsp melted butter', '1 tbsp maple syrup'],
		steps: ['Whisk the flour, baking powder, and a pinch of salt in a large bowl.', 'In another bowl, whisk milk, ricotta, eggs, lemon zest, and melted butter until just combined.', 'Fold wet ingredients into dry ingredients. A few small lumps are perfect.', 'Cook small scoops on a buttered skillet over medium heat until bubbles form, then flip.', 'Serve warm with berries and maple syrup.'],
	},
	{
		id: 'green-goddess-bowl', title: 'Green goddess grain bowl', category: 'Lunch',
		image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85',
		time: 30, servings: 2, difficulty: 'Easy', color: 'green',
		description: 'A crunchy, herby, deeply satisfying bowl with the brightest little dressing.',
		ingredients: ['1 cup cooked farro', '1 ripe avocado', '1 cucumber', '1 cup snap peas', '½ cup Greek yogurt', '1 bunch mixed soft herbs', '1 lemon'],
		steps: ['Cook the farro in salted water until tender, then drain and let it cool slightly.', 'Blend yogurt, herbs, lemon juice, olive oil, and salt into a vivid green dressing.', 'Slice the cucumber and avocado; halve the snap peas on the diagonal.', 'Divide farro between bowls and arrange vegetables on top.', 'Spoon over plenty of green dressing and finish with cracked pepper.'],
	},
	{
		id: 'tomato-butter-beans', title: 'Tomato butter beans', category: 'Dinner',
		image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=85',
		time: 35, servings: 4, difficulty: 'Easy', color: 'tomato',
		description: 'Creamy beans in a jammy tomato sauce. A crusty piece of bread is not optional.',
		ingredients: ['2 cans butter beans, drained', '500 g cherry tomatoes', '3 garlic cloves', '3 tbsp olive oil', '½ tsp chili flakes', '1 small bunch basil', 'Crusty bread, to serve'],
		steps: ['Warm olive oil in a deep pan, then add sliced garlic and chili flakes.', 'Add tomatoes and a generous pinch of salt. Cook until they burst and turn jammy.', 'Stir in the butter beans and half a cup of water; simmer for 12 minutes.', 'Tear in the basil leaves and taste for seasoning.', 'Serve straight from the pan with toasted bread for scooping.'],
	},
	{
		id: 'peach-burrata-toast', title: 'Peach & burrata toast', category: 'Lunch',
		image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85',
		time: 15, servings: 2, difficulty: 'Easy', color: 'yellow',
		description: 'Sweet summer peaches, milky burrata, peppery greens, and honey on sourdough.',
		ingredients: ['2 thick slices sourdough', '2 ripe peaches', '1 ball burrata', '1 handful arugula', '1 tbsp honey', '1 tbsp olive oil', 'Flaky salt'],
		steps: ['Toast the sourdough until deeply golden and brush with olive oil.', 'Slice the peaches into wedges and toss with a tiny pinch of flaky salt.', 'Pile arugula onto each toast and arrange peach slices over the top.', 'Tear the burrata over the peaches, letting the creamy center spill out.', 'Drizzle with honey and finish with black pepper.'],
	},
	{
		id: 'miso-mushroom-noodles', title: 'Miso mushroom noodles', category: 'Dinner',
		image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85',
		time: 20, servings: 2, difficulty: 'Easy', color: 'plum',
		description: 'Slurpable noodles, crispy mushrooms, and a savory miso butter sauce.',
		ingredients: ['200 g udon noodles', '250 g mixed mushrooms', '1 tbsp white miso', '1 tbsp butter', '1 tbsp soy sauce', '2 scallions', '1 tsp sesame seeds'],
		steps: ['Cook the noodles according to their package, then drain and reserve a little water.', 'Tear mushrooms into bite-sized pieces and sear in a hot pan until crisp.', 'Lower the heat and stir in butter, miso, soy, and a splash of noodle water.', 'Toss noodles through the sauce until glossy.', 'Finish with sliced scallions and sesame seeds.'],
	},
	{
		id: 'olive-oil-cake', title: 'Orange olive oil cake', category: 'Dessert',
		image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85',
		time: 55, servings: 8, difficulty: 'Medium', color: 'orange',
		description: 'A tender, citrus-scented cake with a crackly sugar top and no special occasion required.',
		ingredients: ['1½ cups all-purpose flour', '¾ cup sugar', '2 eggs', '½ cup olive oil', '½ cup Greek yogurt', '1 orange, zested and juiced', '1 tsp baking powder'],
		steps: ['Heat the oven to 175°C and line a 20 cm cake tin with parchment.', 'Whisk eggs and sugar until pale, then slowly whisk in olive oil.', 'Fold in yogurt, orange zest, and juice, followed by flour and baking powder.', 'Pour into the tin and bake for 38 to 42 minutes until golden.', 'Cool before dusting with sugar and slicing.'],
	},
	{
		id: 'chili-lime-honey-corn-waffles', title: 'Chili-lime honey corn waffles', category: 'Breakfast',
		image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1200&q=85',
		time: 30, servings: 4, difficulty: 'Easy', color: 'yellow',
		description: 'Crisp-edged corn waffles get a sweet-heat finish from lime zest and chili honey.',
		ingredients: ['1 cup fine cornmeal', '¾ cup all-purpose flour', '1 cup buttermilk', '1 egg', '2 tbsp melted butter', '1 lime, zested and juiced', '3 tbsp honey', '½ tsp chili flakes'],
		steps: ['Whisk cornmeal, flour, and a pinch of salt in a bowl.', 'In another bowl, whisk buttermilk, egg, and melted butter, then stir into the dry ingredients.', 'Cook the batter in a lightly greased waffle iron until deeply golden and crisp.', 'Warm honey with chili flakes and lime juice for one minute.', 'Serve the waffles hot with chili-lime honey and extra lime zest.'],
	},
	{
		id: 'mango-crispy-rice-salad', title: 'Mango crispy-rice salad', category: 'Lunch',
		image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85',
		time: 35, servings: 2, difficulty: 'Easy', color: 'peach',
		description: 'Golden crunchy rice meets juicy mango, mint, and a punchy lime-peanut dressing.',
		ingredients: ['2 cups cooked jasmine rice, chilled', '1 ripe mango, diced', '½ cucumber, diced', '½ cup edamame', '¼ cup fresh mint leaves', '2 tbsp neutral oil', '2 tbsp peanut butter', '1 lime', '1 tbsp soy sauce'],
		steps: ['Press the chilled rice into a lightly oiled pan and cook without stirring until the bottom is crisp.', 'Flip the rice in sections and crisp the other side, then break it into bite-sized pieces.', 'Whisk peanut butter, lime juice, soy sauce, and a splash of warm water into a pourable dressing.', 'Toss mango, cucumber, edamame, and mint together in a serving bowl.', 'Fold in the crispy rice just before serving and drizzle with dressing.'],
	},
	{
		id: 'harissa-apricot-butter-beans', title: 'Harissa-apricot butter beans', category: 'Dinner',
		image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=85',
		time: 30, servings: 4, difficulty: 'Easy', color: 'tomato',
		description: 'Smoky harissa and sweet dried apricots turn pantry beans into a glossy, spicy-sweet supper.',
		ingredients: ['2 cans butter beans, drained', '1 small red onion, sliced', '2 tbsp olive oil', '1½ tbsp rose harissa', '6 dried apricots, chopped', '1 can crushed tomatoes', '½ cup vegetable stock', '½ lemon', '½ cup thick yogurt'],
		steps: ['Soften the onion in olive oil over medium heat for 5 minutes.', 'Stir in harissa and chopped apricots; cook until fragrant.', 'Add tomatoes, stock, and butter beans, then simmer gently for 15 minutes.', 'Squeeze in lemon and season to taste.', 'Serve with cool yogurt and warm flatbread for scooping.'],
	},
	{
		id: 'black-sesame-miso-cookies', title: 'Black sesame miso cookies', category: 'Dessert',
		image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=85',
		time: 28, servings: 12, difficulty: 'Easy', color: 'plum',
		description: 'Nutty black sesame and a little white miso make these chewy brown-butter cookies sweet, salty, and hard to forget.',
		ingredients: ['115 g unsalted butter', '¾ cup brown sugar', '1 egg', '1 tbsp white miso', '1½ cups all-purpose flour', '2 tbsp black sesame paste', '½ tsp baking soda', '½ cup white chocolate chunks'],
		steps: ['Brown the butter in a small pan, then let it cool until just warm.', 'Whisk brown sugar, egg, miso, and sesame paste into the butter.', 'Fold in flour and baking soda, then stir through the white chocolate.', 'Chill the dough for 15 minutes while the oven heats to 175°C.', 'Scoop onto a lined tray and bake for 10 to 12 minutes until the edges are golden.'],
	},
]

function readRecipes() {
	try {
		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
		if (!Array.isArray(saved) || !saved.length) return starterRecipes
		const savedIds = new Set(saved.map((recipe) => recipe.id))
		return [...saved, ...starterRecipes.filter((recipe) => !savedIds.has(recipe.id))]
	} catch {
		return starterRecipes
	}
}

export function RecipeProvider({ children }) {
	const [recipes, setRecipes] = useState(readRecipes)
	const [favorites, setFavorites] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem(`${STORAGE_KEY}-favorites`)) || []
		} catch {
			return []
		}
	})

	useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes)), [recipes])
	useEffect(() => localStorage.setItem(`${STORAGE_KEY}-favorites`, JSON.stringify(favorites)), [favorites])

	function toggleFavorite(id) {
		setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
	}

	function addRecipe(recipe) {
		const id = `${recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`
		const created = { ...recipe, id, color: 'green' }
		setRecipes((current) => [created, ...current])
		return created
	}

	return <RecipeContext.Provider value={{ recipes, favorites, toggleFavorite, addRecipe }}>
		{children}
	</RecipeContext.Provider>
}


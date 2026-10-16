import './App.css'
import './Luxury.css'
import { RecipeProvider } from './context/RecipeContext.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Favourites from './pages/Favourites.jsx'
import Addrecipe from './pages/Addrecipe.jsx'
import RecipeDetails from './pages/RecipeDetails.jsx'

function AppContent() {
  const path = window.location.pathname
  let page = <Home />

  if (path === '/favorites' || path === '/favourites') page = <Favourites />
  if (path === '/add-recipe') page = <Addrecipe />
  if (path.startsWith('/recipe/')) page = <RecipeDetails />

  return <><Navbar /><main>{page}</main></>
}

function App() {
  return <RecipeProvider><AppContent /></RecipeProvider>
}

export default App

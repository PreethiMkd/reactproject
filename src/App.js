import React,{useEffect,useState} from "react";
import './App.css';
import Recipe from './Recipe.js';

const App = () => {
  const APP_ID = "610ba7db";
  const APP_KEY = "97d96f04cb377fc357a77e0f7e76025b	";
  const [recipes,setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState("chicken");
  //const example_req = `https://edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  useEffect(()=>{
    getRecipes();
  },[query]);
  const getRecipes = async () =>{
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
  }
  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search);
  }
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return(
    <div className="App">
      <h1 className="title">Recipe Search</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipes => (<Recipe 
        key = {recipes.recipe.label}
        title ={recipes.recipe.label} 
        calories = {recipes.recipe.calories}
        image = {recipes.recipe.image}
        ingredients = {recipes.recipe.ingredients}/>
        ))}
      </div> 
    </div>  
  );
}

export default App;

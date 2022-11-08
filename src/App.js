import React, { useEffect, useState,Suspense,lazy, useMemo } from 'react';
import { Header } from './components/Header';
import {BgVideo} from  './components/BgVideo';
import {Error}  from './components/Error';
import Search from './components/Search';
import {Spinner} from './components/Spinner';
import './App.css';
import LocalStorageManager from "./utils/LocalStorageManager";

const Recipes = lazy(() => import ('./components/Recipes'));

const App = () => {
  const APP_ID = process.env.REACT_APP_RECIPES_API_ID;
  const APP_KEY = process.env.REACT_APP_RECIPES_API_KEY;
  const storageQuery = LocalStorageManager.get('searchQuery');
  const storageRecipes = (!LocalStorageManager.get('recipes')?[]:LocalStorageManager.get('recipes'));
  const [recipes, setRecipes] = useState(storageRecipes);
  const [query, setQuery] = useState(storageQuery);
  const [isLoading,setIsLoading] = useState(true);
  const[err,setError] =useState('');
  const[hasError,setHasError] =useState(false);
  let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

 

  const addRecipes = (e,searching,isValid) => {
    e.preventDefault();
    if(!isValid)return
    setQuery(searching);
  }

  const getRecipes = useMemo(()=>
    async () => {
    try{  
      const response = await fetch(url);
      const data = await response.json();
      if(!data.hits.length>0)setError("couldnt found the recipe, please search for another")
      setRecipes(data.hits);
      LocalStorageManager.set("recipes",data.hits)
    }
    catch(error){
      setHasError(true);
    }
},[url]);
  
  useEffect(() => {
    if (!recipes.length>0) setError("Still loading, please wait")
    if (hasError) setError("Something happend, please reload the page and check you Internet connection")
  }, [recipes.length,isLoading, hasError]);
  
  
  useEffect(() => {
    getRecipes();
    setIsLoading(true);
  }, [query,getRecipes]);
  
  
  useEffect(() => {
    if(!recipes.length>0 && !isLoading)setError("Couldn`t find the recipes, please serach again");
    if(recipes.length>0)setIsLoading(false);
  }, [ recipes, isLoading]);



  return (
    <div className="app">
      <BgVideo/>
      <div className="app-container">
        <Header/>
        <Search addRecipes={addRecipes}/>
        <Suspense fallback={<Spinner/>}>
        <Recipes  recipes={recipes} />
        </Suspense>
      </div> 
      {isLoading? 
        <Error err={err}/>
        :null
      }
    </div>
  );
}

export default App;

import React, { useEffect, useState,Suspense,lazy, useMemo } from 'react';
import { Header } from './components/Header';
import {BgVideo} from  './components/BgVideo';
import {Error}  from './components/Error';
import Search from './components/Search';
import {Spinner} from './components/Spinner';
import './App.css';
import LocalStorageManager from "./utils/LocalStorageManager";
import useLocalStorage from './hooks/useLocalStorage';

const Recipes = lazy(() => import ('./components/Recipes'));
interface RecipeData {
  data:{hits: {
    recipe: {
      calories: number;
      label: string;
      image: string;
      url: string;
      ingredients: string[];
      uri: string;
    };
  }[];} 
  
}
const App = () => {
  const [recipes, setRecipes] = useLocalStorage('recipes',!LocalStorageManager.get('recipes')?[]:LocalStorageManager.get('recipes'));
  const [query, setQuery] = useLocalStorage('searchQuery', LocalStorageManager.get('searchQuery')|| 'pasta');
  const [isLoading,setIsLoading] = useState(true);
  const[err,setError] =useState('');
  const[hasError,setHasError] =useState(false);
//  let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

 

  const addRecipes = (e:React.FormEvent<HTMLFormElement>,searching:string,isValid:boolean) => {
    e.preventDefault();
    if(!isValid)return
    setQuery(searching);
  }

  const getRecipes = useMemo(()=>async () => {
    setIsLoading(true);
    try{  
      const response = await fetch(`/getRecipes?=${query}`);
      const data:RecipeData = await response.json();
      if(data.data.hits.length>0){
     const newRecipes = data.data.hits.map(({ recipe}) => ({
          recipe: {
            calories: recipe.calories,
            label: recipe.label,
            image: recipe.image,
            url: recipe.url,
            ingredients: recipe.ingredients,
            uri: recipe.uri,
          },
        }));
        setRecipes(newRecipes);       
        setIsLoading(false);
      }
      else setError("couldnt found the recipe, please search for another")
    }
    catch(error){
      setHasError(true);
    }
},[query,setRecipes]);
  
  useEffect(() => {
    if (!(recipes.length>0)) setError("Still loading, please wait")
    if (hasError) setError("Something happend, please reload the page and check you Internet connection" )
    if(recipes.length>0)setIsLoading(false);
    return () => { 
      setError("")
      setIsLoading(false)
    }
  }, [recipes.length,isLoading, hasError]);
  
  
  useEffect(() => {
    let isMounted = true;
    if(isMounted)getRecipes(); 
    return () => { isMounted = false}
  }, [query,getRecipes]);

  return (
    <div className="app" >
      <BgVideo/>
      <div className="app-container">
        <Header/>
        <Search addRecipes={addRecipes}/>
        {recipes && <Suspense fallback={<Spinner/>}>
            <Recipes  recipes={recipes} />
          </Suspense>
        }
        {err.length?<Error err={err}/>:null}
      </div> 
    </div>
  );
}

export default App;

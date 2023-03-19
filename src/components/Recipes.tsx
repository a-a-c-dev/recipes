import React from 'react';
import Recipe from './Recipe';

interface RecipesProps {
  recipe:RecipeProps
}


interface RecipeProps {
  uri:string
  label:string
  calories:string
  image:string
  ingredients:Ingredient[]
  url:string
}

interface Ingredient{
  text :string
  quantity: number,
  measure:string,
  food:string,
  weight:number


}

const Recipes =React.memo( ({recipes}:{recipes: RecipesProps[]}) => {
    return (
        <div role='recipes' className="recipes">  
          { recipes.map(recipe => (
              <Recipe key={recipe.recipe.uri}
              title={recipe.recipe.label}
              calories={Math.floor(Number(recipe.recipe.calories))}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              url={recipe.recipe.url}
              />
            ))
          }
        </div>
    )
})

export default Recipes
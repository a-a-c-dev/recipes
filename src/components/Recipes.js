import React from 'react';
import Recipe from './Recipe';


const Recipes =React.memo( ({recipes}) => {
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
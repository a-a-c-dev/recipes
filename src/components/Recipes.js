import React from 'react';
import Recipe from './Recipe';


const Recipes =React.memo( ({recipes}) => {
    return (
        <div className="recipes">  
          { recipes.map(recipe => (
              <Recipe key={recipe.recipe.uri}
              title={recipe.recipe.label}
              calories={Math.floor(Number(recipe.recipe.calories))}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              />
            ))
          }
        </div>
    )
})

export default Recipes
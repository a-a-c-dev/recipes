import React from "react";
import style from '../recipe.module.css';

interface RecipeProps { 
    url:string, 
    title:string,
    calories:number, 
    image:string
    ingredients:Ingredient[]
}

interface Ingredient{
    text :string
}


const Recipe = React.memo(({ url,title, calories, image, ingredients = [] }:RecipeProps) => (
    <div role="recipes" className={style.recipe}>
        <img src={image} className={style.image} alt='' />
        <h3 role='title'>{title}</h3>
        <h5>Ingredients :</h5>
        <ul>{ingredients.map((value,i) => (<li role={'ingredients'} key={`${Math.floor(Math.random()*1000000)}-${i}-${value.text}}`}>{value.text}</li> ))}
        <a href={url}>See More</a>
        </ul>
        <p role="calories">Calories: {calories}</p>

    </div>
))

export default Recipe;
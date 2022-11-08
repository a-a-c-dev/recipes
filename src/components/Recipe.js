import React from "react";
import style from '../recipe.module.css';

const Recipe = React.memo(({ url,title, calories, image, ingredients = [] }) => (
    <div className={style.recipe}>
        <img src={image} className={style.image} alt='' />
        <h3>{title}</h3>
        <h5>Ingredients :</h5>
        <ul>{ingredients.map((x,i) => (<li key={i}>{x.text}</li> ))}
        <a href={url}>See More</a>
        </ul>
        
        <p >Calories: {calories}</p>

    </div>
))

export default Recipe;
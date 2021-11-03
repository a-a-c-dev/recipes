import React from "react";
import style from '../recipe.module.css';

const Recipe = React.memo(({ title, calories, image, ingredients = [] }) => (
    <div className={style.recipe}>
        <img src={image} className={style.image} alt='' />
        <h5>{title}</h5>
        <ul>{ingredients.map((x,i) => (<li key={i}>{x.text}</li> ))}</ul>
        <p >Calories: {calories}</p>
    </div>
))

export default Recipe;
import React,{useId} from "react";
import style from '../recipe.module.css';

const Recipe = React.memo(({ url,title, calories, image, ingredients = [] }) => (
    <div role="recipes" className={style.recipe}>
        <img src={image} className={style.image} alt='' />
        <h3 role='title'>{title}</h3>
        <h5>Ingredients :</h5>
        <ul>{ingredients.map((x,i) => (<li role={'ingredients'} key={`${useId}-${i}-${x.text}}`}>{x.text}</li> ))}
        <a href={url}>See More</a>
        </ul>
        <p role="calories">Calories: {calories}</p>

    </div>
))

export default Recipe;
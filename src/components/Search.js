import React,{useState,useCallback} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';


const Search = ({addRecipes}) => {
  
  const [err, setErr] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [searching, setSearching] = useLocalStorage("searchQuery", 'pasta');
  
  const InputIsValid = useCallback(() => {
    const errors = {};
    const textPa = /^[a-zA-Z -]+$/;
    if (!searching.match(textPa)) errors.query = "*Query is not Valid";
    if (!searching.length>0)errors.query = "*Query is required";
    setErr(errors);
    setIsValid(Object.keys(errors).length === 0);
  },[searching]);
  
  const debounce = fn => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), 200);
    }
  };



  const OnChangeSearching = value => {
    setSearching(value);
    InputIsValid()
  }


  const optimizedhandle = useCallback(debounce(OnChangeSearching),[]);
  
    return (
        <form className="search-form" onSubmit={(event)=>addRecipes(event,searching,isValid)}  >
        <input className="search-bar" type="text" onChange={event=>optimizedhandle(event.target.value)} />
        <button className="search-button" type="submit"  disabled={!isValid} >Search</button>
        <div className="validation-error">{err.query}</div>
      </form>
    )
}


export default Search
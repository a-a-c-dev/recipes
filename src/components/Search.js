import React,{useState,useCallback} from 'react';


const Search = ({addRecipes}) => {
  
  const [err, setErr] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [searching, setSearching] = useState("");
  
  const InputIsValid = useCallback(() => {
    const errors = {};
    const textPa = /^[a-zA-Z -]+$/;
    if (!searching.match(textPa)) errors.query = "*Query is not Valid";
    if (!searching.length>0)errors.query = "*Query is required";
    setErr(errors);
    setIsValid(Object.keys(errors).length === 0);
  },[searching]);
  
  const OnChangeSearching = e => {
    setSearching(e.target.value);
    InputIsValid()
  }

    return (
        <form className="search-form" onSubmit={(event)=>addRecipes(event,searching,isValid)}  >
        <input className="search-bar" type="text" onChange={OnChangeSearching} />
        <button className="search-button" type="submit"  disabled={!isValid} >Search</button>
        <div className="validation-error">{err.query}</div>
      </form>
    )
}


export default Search
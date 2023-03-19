import React,{useState,useCallback} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface SearchProp{
  addRecipes: (event : React.FormEvent<HTMLFormElement> , searching: string, isValid: boolean) => void
}
interface Erros {
  query?:string
}

const Search = ({addRecipes}:SearchProp) => {
  
  const [err, setErr] = useState<Erros>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [searching, setSearching] = useLocalStorage<any>("searchQuery", 'pasta' as string );
  
  const InputIsValid = useCallback(() => {
    const errors:Erros = {};
    const textPa = /^[a-zA-Z -]+$/;
    if (!searching.match(textPa)) errors.query = "*Query is not Valid";
    if (!(searching.length>0))errors.query = "*Query is required";
    setErr(errors);
    setIsValid(Object.keys(errors).length === 0);
  },[searching]);
  
  const debounce = (fn:Function) => {
    let timerId:ReturnType<typeof setTimeout>;
    return (...args:any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), 200);
    }
  };

  const OnChangeSearching = (value:string) => {
    setSearching(value);
    InputIsValid()
  }

  const optimizedhandle = useCallback(debounce(OnChangeSearching),[]);
  
    return (
      <form role="searchForm" className="search-form" onSubmit={(event)=>addRecipes(event,searching,isValid)}  >
        <input className="search-bar" type="text" placeholder='Type to search' onChange={event=>optimizedhandle(event.target.value)} />
        <button className="search-button" type="submit"  disabled={!isValid} >Search</button>
        <div className="validation-error">{err.query}</div>
      </form>
    )
}


export default Search
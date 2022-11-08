import { useEffect, useState } from "react";
import LocalStorageManager from "../utils/LocalStorageManager";



const useLocalStorage = (storageKey, prevState) => {
    const storageData = LocalStorageManager.get(storageKey) || prevState ;

    const [value, setValue] = useState(storageData);
   
    useEffect(() => {
      LocalStorageManager.set(storageKey, (value));

    }, [value, storageKey]);
  
    return [value, setValue];
  };
export default useLocalStorage 
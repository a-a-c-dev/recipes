const prefix = 'recipes_app_';
const isObject = (v:any) => typeof v === 'object' && !Array.isArray(v) && v !== null;
const LocalStorageManager = {
    set: (key:string,value:any) => {
        if (typeof window !== "undefined") {
            return window.localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
        }

    },
    get: (key:string) => {
        if (typeof window !== "undefined") {
            let value:any =  window.localStorage.getItem(`${prefix}${key}`);

            try {
                return JSON.parse(value);
            }catch (e){
                return value;
            }
        }
    }
}

export default LocalStorageManager;
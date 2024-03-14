import { useState } from "react"
import { Login } from "./Login";
import { Auth } from "./Auth";

export function Access() {
       const [isAaccess,setAccess] = useState<boolean>(false); 
       function onAccess(blnAccess: boolean){
        setAccess(blnAccess);
       }
   return(
    <>
    {isAaccess ? (<Auth />):(<Login onSent={onAccess} />)}
    </>
   );
}
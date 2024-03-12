import { SetSession, SetTemp, GetTemp, RemoveTemp } from "./sessions";

let  randomKey = 0;
let  userEmail = '';
export async function createToken(guestEmail: string){
    userEmail = guestEmail;
    randomKey = Math.floor(1000 + Math.random() * 9000);    
    SetTemp(guestEmail,randomKey);
    const guestObj = {
        email: guestEmail,
        token: randomKey
    };
    return guestObj;
}

export function checkToken(token: number) {
    const tempSession =  GetTemp();
    if (token==tempSession.token){
        RemoveTemp();
        SetSession(userEmail)
        return true;
    }
    return false;
}
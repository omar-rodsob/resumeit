import moment from "moment";

type GuestSession = {
    expiresAt: string;
    guestData: {
        email: string;
    };
}

export function GetSession(){    
    let GuestSession = sessionStorage.getItem("GuestSession");
    const today = moment().calendar();    
    if (GuestSession){
        const objGuest = JSON.parse(GuestSession) ;
        const isExpired = moment().diff(objGuest?.expiresAt, 'days') > 0;
        if(isExpired){
            sessionStorage.removeItem("GuestSession");  
            GuestSession = null;
        }
    }

    return GuestSession;
}

export function SetSession(guestEmail: string){
    var expires = moment().add(5, 'days').format(); 
    var sessionObject: GuestSession = {
        expiresAt: expires,
        guestData: {
            email: guestEmail
        }
    } 
    sessionStorage.setItem('GuestSession', JSON.stringify(sessionObject));
}

export function SetTemp(guestEmail: string, token:number){
    var expires = moment().add(1, 'hour').format(); 
    var sessionObject = {
        email:guestEmail,
        token: token,
        expiresAt: expires
    } 
    sessionStorage.setItem('TempSession', JSON.stringify(sessionObject));
}

export function GetTemp(){
    const tempObj = sessionStorage.getItem("TempSession");
    
    let TempSession = {
        token:0,
        email:'',
        expiresAt: ''
    }
    if(tempObj){
        TempSession = JSON.parse(tempObj);
    }
    
    return TempSession;
}

export function RemoveTemp(){
    sessionStorage.removeItem("TempSession"); 
}

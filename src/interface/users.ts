export  interface User  {
    id:number
    email:string
    password?:string
    encryptedPassword?: string
    role: "admin" | "normal"
    registrationCode?: number
    avatar?: string
}
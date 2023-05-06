export  interface exercise {
    id:number
    type:"aerobic" | "strenght" | "aerobic/strength"
    movility: "reduced" | "begginer" | "advanced"
    name: string
    description: string
    media?: string
    userId: number
} 


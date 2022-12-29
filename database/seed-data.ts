interface SeedData{
    entries:SeedEntry[];
}

interface SeedEntry{
    description: string;
    status: string;
    createdAt: number;
}

export const seedData:SeedData={
    entries:[
        {
            description: "Pendiente:Color Prudente",
            status: "pending",
            createdAt: Date.now(),
          },
          {
            description: "En-Progreso:Señor Bigoton",
            status: "in-progress",
            createdAt: Date.now() - 100000,
          },
          {
            description: "Terminadas:Birote Caliente",
            status: "finished",
            createdAt: Date.now() - 100000,
          },
    ]
}
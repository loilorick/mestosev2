const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function category() {
    const createCategory = await prisma.categories.createMany({
        data: [
            { title: "музеи" },
            { title: "парки" },
            { title: "кинотеатры" },
            { title: "театры" },
            { title: "памятники" },

        ],
        skipDuplicates: true
    }
    );

}
async function Admin() {
    const users = await prisma.users.createMany({
        data: [
            {
                 username: "Admin",
                 password:"13422431",
                 type:"A"
         },
         {
            username: "Andrey",
            password:"311007",
            type:"A"
    },
        ],
        skipDuplicates: true
    }
    );

}
category()
Admin()



    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })
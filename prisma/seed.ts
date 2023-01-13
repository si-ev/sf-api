import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const dishCategoryData: Prisma.DishCategoryCreateInput[] = [
    { name: 'Горячие закуски' },
    { name: 'Холодные закуски' },
    { name: 'Балканские бургеры' },
    { name: 'Салаты' },
    { name: 'Супы' },
    { name: 'Выпечка из теста "Фило" собственного производства' },
    { name: 'Горячие блюда' },
    { name: 'Мясные блюда' },
    { name: 'Праймбиф стейки' },
    { name: 'Фермерские стейки' },
    { name: 'Рыба - Морепродукты' },
    { name: 'Блюда из дровяной печи "Вкус истории"' },
    { name: 'Гарниры' },
    { name: 'Десерты' }
];

const dishData: Prisma.DishCreateInput[] = [
    {
        name: 'Брускетты с помидорами и беконом',
        weight: 95,
        price: 145,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Брускетты с креветками и пюре из авокадо',
        weight: 95,
        price: 190,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Брускетты с кабачками и сыром каймак',
        weight: 95,
        price: 145,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Паштет с пьяным виноградом на хлебе-гриль',
        weight: 150,
        price: 247,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Жареный сыр с брусничным соусом',
        weight: 180,
        price: 259,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Ассорти жареных сыров',
        weight: 280,
        price: 480,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Гренки чесночные',
        weight: 130,
        price: 115,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Лангустины с соусом песто',
        weight: 180,
        price: 590,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Жареные тигровые креветки с перечным соусом',
        weight: 180,
        price: 590,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Жареные креветки с перечным соусом',
        weight: 180,
        price: 399,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Мидии с томатами и чоризо',
        weight: 350,
        price: 480,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Вкусняшки к пиву',
        weight: 460,
        price: 499,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Куриные крылья BBQ в соусе терияки с картофлем фри',
        weight: 320,
        price: 289,
        category: {
            connect: { id: 1 }
        }
    },
    {
        name: 'Перец "лучаный"',
        weight: 100,
        price: 139,
        category: {
            connect: { id: 2}
        }
    },
    {
        name: 'Сырная тарелка',
        weight: 260,
        price: 395,
        category: {
            connect: { id: 2}
        }
    },
    {
        name: 'Черногорская тарелка',
        weight: 250,
        price: 349,
        category: {
            connect: { id: 2}
        }
    },
    {
        name: 'Тар-тар из сёмги с авокадо',
        weight: 260,
        price: 286,
        category: {
            connect: { id: 2}
        }
    },
    {
        name: 'Сербский погребок',
        weight: 360,
        price: 269,
        category: {
            connect: { id: 2}
        }
    },
    {
        name: 'Карпаччо из сёмги',
        weight: 150,
        price: 390,
        category: {
            connect: { id: 2}
        }
    },
    {
        name: 'Сельдь с картофелем луком и лимоном',
        weight: 250,
        price: 199,
        category: {
            connect: { id: 2}
        }
    }
];

async function main(){
    console.log(`Start seeding ...`);
    const categories = await prisma.dishCategory.createMany({
            data: dishCategoryData,
    });
    for (const d of dishData){
        const dish = await prisma.dish.create({
            data: d,
        })
        console.log(`Created dish with id: ${dish.id}`);
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch( async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

    import { PrismaClient } from "@prisma/client";
    
    const prisma = new PrismaClient();
    async function run() {
        await prisma.product.createMany({
            data:[
                {
                    id : 1,
                    name: "ไอดีแท้มายคราฟ",
                    description: "ไม่โดนแบน hypixel",
                    price: 500,
                },
                {
                    id : 2,
                    name: "ไก่ตัน Blox fruit",
                    price: 20,
                }
            ]
        })
    }

run()
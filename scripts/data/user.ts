import { faker } from "@faker-js/faker";

export const users = [
    {
        name: faker.name.firstName(),
        balance: faker.datatype.float(),
    },
    {
        name: faker.name.firstName(),
        balance: faker.datatype.float(),
    },
]

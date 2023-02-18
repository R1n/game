import { faker } from "@faker-js/faker";

export const bets = [
    {
        userId: 1,
        betAmount: faker.datatype.float(),
        chance: faker.datatype.float(),
        payout: faker.datatype.float(),
        win: faker.datatype.boolean(),
    },
    {
        userId: 2,
        betAmount: faker.datatype.float(),
        chance: faker.datatype.float(),
        payout: faker.datatype.float(),
        win: faker.datatype.boolean(),
    },
]

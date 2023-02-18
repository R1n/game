import {Arg, ID, Query, Resolver} from "type-graphql";

import { User } from "../models/user.model";

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await User.findAll({attributes: ["id", "name", "balance"]});
    }

    @Query(() => User)
    public async getUserById (
        @Arg("id", () => ID) id: number,
    ): Promise<User> {
        return await User.findByPk(id) as User
    }
}


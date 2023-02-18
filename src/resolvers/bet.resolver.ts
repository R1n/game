import { GraphQLError } from "graphql"
import { Op, Transaction, QueryTypes } from "sequelize";
import { Arg, Args, ID, Query, Mutation, Resolver } from "type-graphql";

import { Bet } from "../models/bet.model";
import { User } from "../models/user.model";

import GetBetWithLimitArgs from '../value.objects/input/get.bet.with.limit.args'
import CreateBetArgs from '../value.objects/input/create.bet.args'
import {sequelize} from "../database";

@Resolver(Bet)
export class BetResolver {
    @Query(() => [Bet])
    async bets(): Promise<Bet[]> {
        return await Bet.findAll();
    }

    @Query(() => Bet)
    public async getBetById (
        @Arg("id", () => ID) id: number,
    ): Promise<Bet> {
        return await Bet.findByPk(id) as Bet
    }

    @Query(() => [Bet])
    public async getBestBetPerUser (
        @Args() { limit }: GetBetWithLimitArgs
    ): Promise<any> {
        const bets = await sequelize.query(
            `SELECT DISTINCT ON (u.id)
                b.id,
                b."userId",
                b."betAmount",
                b.chance,
                b.payout,
                b.win
             FROM "Users" u
                 JOIN "Bets" b ON b."userId" = u.id
             ORDER BY u.id, b."betAmount" DESC
             LIMIT :limit;`,
            {
                replacements: { limit },
                type: QueryTypes.SELECT
            }
        );
        return bets;
    }


    @Mutation(() => Bet)
    async createBet(
        @Args() args: CreateBetArgs
    ): Promise<Bet> {
        const user = await User.findOne({where:{
            id: args.userId,
            balance: {
                [Op.gte]: args.betAmount
            }
        }})

        if (!user)
            throw new GraphQLError("Not enough balance")


        const t = await sequelize.transaction({
            autocommit: false,
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
        });

        const win = Math.random() * 100 <= args.chance;
        let payout

        if(win){
            payout = (100 / args.chance) * args.betAmount
            await user.increment({ balance: payout },  {transaction: t})
        }else {
            await user.decrement({ balance: args.betAmount },  {transaction: t})
            payout = 0
        }

        const newBet = await Bet.create({
            userId: args.userId,
            betAmount: args.betAmount,
            chance: args.chance,
            payout,
            win,
        }, { transaction: t}) as Bet;
        await t.commit();

        return newBet;
    }

}


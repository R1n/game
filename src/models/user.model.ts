import { Column, Table, PrimaryKey, Model, AutoIncrement, HasMany } from "sequelize-typescript";
import { ObjectType, Field, ID } from "type-graphql";
import { Bet } from "./bet.model";

@Table({ createdAt: false, updatedAt: false })
@ObjectType()
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Field(() => ID)
  @Column
  id: number;

  @Column
  @Field()
  name!: string;

  @Column({ type: "float" })
  @Field()
  balance!: number;

  @HasMany(() => Bet)
  bets: Bet[];
}

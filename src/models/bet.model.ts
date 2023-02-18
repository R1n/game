import {Table, Model, Column, ForeignKey, PrimaryKey, AutoIncrement, BelongsTo} from "sequelize-typescript";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user.model";

@Table({ createdAt: false, updatedAt: false })
@ObjectType()
export class Bet extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => ID)
  id: number;

  @ForeignKey(() => User)
  @Column
  @Field(() => ID)
  userId!: number;

  @Column({ type: "float" })
  @Field()
  betAmount!: number;

  @Column({ type: "float" })
  @Field()
  chance!: number;

  @Column({ type: "float" })
  @Field()
  payout!: number;

  @Column
  @Field()
  win!: boolean;

  @BelongsTo(() => User)
  user: User;
}

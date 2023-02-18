import {ArgsType, Field, Float, Int} from 'type-graphql'
import { IsInt, Min, Max } from 'class-validator'
import IdExistsInDb from "../validators/id.exists.in.db";
import {User} from "../../models/user.model";

@ArgsType()
class CreateBetArgs {
  @Field(() => Int)
  @IsInt({ message: "'id' value should be a positive integer" })
  @Min(1, { message: "'id' value should be a positive integer" })
  @IdExistsInDb(User)
  userId: number

  @Min(0, { message: "'betAmount' value should be a positive integer" })
  @Field(() => Float)
  betAmount: number

  @Min(1, { message: "'chance' value should be a positive integer" })
  @Max(100, { message: "'chance' value should be less or equal 100" })
  @Field(() => Float)
  chance: number
}

export default CreateBetArgs

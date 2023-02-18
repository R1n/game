import { ArgsType, Field } from 'type-graphql'
import { IsInt, Min } from 'class-validator'

@ArgsType()
class GetBetWithLimitArgs {
  @Field({defaultValue: 10})
  @IsInt({ message: "'limit' value should be a positive integer" })
  @Min(1, { message: "'limit' value should be a positive integer" })
  limit: number
}

export default GetBetWithLimitArgs

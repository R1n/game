import {
  ValidationOptions,
  ValidationArguments,
  registerDecorator
} from 'class-validator'
import {Model, ModelCtor} from "sequelize-typescript";

function IdExistsInDb <M extends Model>(entity: ModelCtor<M>, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'idExistsInDatabase',
      target: object.constructor,
      propertyName,
      constraints: [entity],
      options: validationOptions,
      validator: {
        validate: async (value: any) => {
          const result = await entity.findByPk(value)
          return !!result
        },
        defaultMessage: (args: ValidationArguments) => {
          const { value } = args
          const entityName = args.constraints[0].name
          return `No ${entityName} with id '${value}' found`
        },
      }

    })
  }
}

export default IdExistsInDb

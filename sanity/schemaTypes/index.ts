import { type SchemaTypeDefinition } from 'sanity'

import {categoryType} from './categoryType'

import Car from './car'
import notification from './notification'
import User from './User'
import booking from './booking'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ categoryType, Car , notification , User , booking ],
}

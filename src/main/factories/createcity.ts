import { CreateCityController } from '../../presentation//controllers/createcity/createcity'
import { StateValidatorAdapter } from '../../utils/state-validator'
import { DbAddCity } from '../../data/usecases/add-city/db-add-city'
import { CityPgRepository } from '../../infra/bd/postgresql/city-repository/city'
import { StateValidatorLib } from '../../infra/validators/state-validator'

export const makeCreateCityController = (): CreateCityController => {
  const stateValidatorLib = new StateValidatorLib()
  const stateValidatorAdapter = new StateValidatorAdapter(stateValidatorLib)
  const cityPgRepository = new CityPgRepository()
  const dbAddAccount = new DbAddCity(cityPgRepository)
  return new CreateCityController(stateValidatorAdapter,dbAddAccount)
}

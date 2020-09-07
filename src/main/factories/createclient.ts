import { CreateClientController } from '../../presentation//controllers/createclient/createclient'
import { GenreValidatorAdapter } from '../../utils/genre-validator/genre-validator-adapter'
import { AgeValidatorAdapter } from '../../utils/age-validator/age-validator-adapter'
import { BirthdateValidatorAdapter } from '../../utils/birthdate-validator/birthdate-validator-adapter'
import { DbAddClient } from '../../data/usecases/add-client/db-add-client'
import { ClientPgRepository } from '../../infra/bd/postgresql/client-repository/client'
import { GenreValidatorLib } from '../../infra/validators/genre-validator/genre-validator'
import { AgeValidatorLib } from '../../infra/validators/age-validator/age-validator'
import { BirthdateValidatorLib } from '../../infra/validators/birthdate-validator/birthdate-validator'

export const makeCreateClientController = (): CreateClientController => {
  const genreValidatorLib = new GenreValidatorLib()
  const genreValidatorAdapter = new GenreValidatorAdapter(genreValidatorLib)
  const ageValidatorLib = new AgeValidatorLib()
  const ageValidatorAdapter = new AgeValidatorAdapter(ageValidatorLib)
  const birthdateValidatorLib = new BirthdateValidatorLib()
  const birthdateValidatorAdapter = new BirthdateValidatorAdapter(birthdateValidatorLib)
  const clientPgRepository = new ClientPgRepository()
  const dbAddClient = new DbAddClient(clientPgRepository)
  return new CreateClientController(genreValidatorAdapter,birthdateValidatorAdapter,ageValidatorAdapter,dbAddClient)
}

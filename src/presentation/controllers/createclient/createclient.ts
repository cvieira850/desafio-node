import { HttpRequest, HttpResponse, Controller, GenreValidator, BirthDateValidator,AgeValidator,AddClient } from './createclient-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class CreateClientController implements Controller {
  private readonly genreValidator: GenreValidator
  private readonly birthdateValidator: BirthDateValidator
  private readonly ageValidator: AgeValidator
  private readonly addClient: AddClient
  constructor (
    genreValidator: GenreValidator,
    birthdateValidator: BirthDateValidator,
    ageValidator: AgeValidator,
    addClient: AddClient) {
    this.genreValidator = genreValidator
    this.birthdateValidator = birthdateValidator
    this.ageValidator = ageValidator
    this.addClient = addClient
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name,lastname, genre, birthdate, age, city } = httpRequest.body
      const requiredFields = ['name','lastname','genre','birthdate','age','city']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValidGenre = this.genreValidator.isValid(genre)
      if (!isValidGenre) {
        return badRequest(new InvalidParamError('genre'))
      }
      const isValidBirth = this.birthdateValidator.isValid(birthdate)
      if (!isValidBirth) {
        return badRequest(new InvalidParamError('birthdate'))
      }
      const isValidAge = this.ageValidator.isValid(age)

      if (!isValidAge) {
        return badRequest(new InvalidParamError('age'))
      }
      const client = await this.addClient.add({
        name,
        lastname,
        genre,
        birthdate,
        age,
        city
      })
      return ok(client)
    } catch (error) {
      return serverError()
    }
  }
}

import { CreateClientController } from './createclient'
import { MissingParamError, ServerError, InvalidParamError } from '../../errors'
import { AddClient,AddClientModel, AgeValidator, GenreValidator, BirthDateValidator, ClientModel } from './createclient-protocols'

interface SutTypes {
  sut: CreateClientController
  ageValidatorStub: AgeValidator
  genreValidatorStub: GenreValidator
  birthdateValidatorStub: BirthDateValidator
  addClientStub: AddClient
}
const makeAddClient = (): AddClient => {
  class AddCityStub implements AddClient {
    async add (client: AddClientModel): Promise<ClientModel> {
      const fakeCity = {
        id: 'valid_id',
        name: 'valid_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }
      return new Promise(resolve => resolve(fakeCity))
    }
  }
  return new AddCityStub()
}
const makeAgeValidator = (): AgeValidator => {
  class AgeValidatorStub implements AgeValidator {
    isValid (age: string): boolean {
      return true
    }
  }
  return new AgeValidatorStub()
}
const makeGenreValidator = (): GenreValidator => {
  class GenreValidatorStub implements GenreValidator {
    isValid (genre: string): boolean {
      return true
    }
  }
  return new GenreValidatorStub()
}
const makeBirthdateValidator = (): BirthDateValidator => {
  class BirthdateValidatorStub implements BirthDateValidator {
    isValid (birthdate: string): boolean {
      return true
    }
  }
  return new BirthdateValidatorStub()
}
const makeSut = (): SutTypes => {
  const ageValidatorStub = makeAgeValidator()
  const genreValidatorStub = makeGenreValidator()
  const birthdateValidatorStub = makeBirthdateValidator()
  const addClientStub = makeAddClient()
  const sut = new CreateClientController(genreValidatorStub,birthdateValidatorStub, ageValidatorStub,addClientStub)
  return {
    sut,
    ageValidatorStub,
    genreValidatorStub,
    birthdateValidatorStub,
    addClientStub
  }
}

describe('Create Client Controller', () => {
  test('Should return 400 if no name is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no lastname is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('lastname'))
  })
  test('Should return 400 if no genre is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        lastname: 'valid_lastname',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('genre'))
  })
  test('Should return 400 if no birthdate is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        age: 'valid_age',
        city: 'valid_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('birthdate'))
  })
  test('Should return 400 if no age is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        city: 'valid_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('age'))
  })
  test('Should return 400 if no city is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('city'))
  })

  test('Should returns 500 if ageValidator throws', async () => {
    const { sut, ageValidatorStub } = makeSut()
    jest.spyOn(ageValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        lastname: 'any_lastname',
        genre: 'any_genre',
        birthdate: 'any_birthdate',
        age: 'any_age',
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should call AgeValidator with correct age', async () => {
    const { sut, ageValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(ageValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        lastname: 'any_lastname',
        genre: 'any_genre',
        birthdate: 'any_birthdate',
        age: 'any_age',
        city: 'any_city'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_age')
  })
  test('Should return 400 if an invalid age is provided ', async () => {
    const { sut , ageValidatorStub } = makeSut()
    jest.spyOn(ageValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        lastname: 'any_lastname',
        genre: 'any_genre',
        birthdate: 'any_birthdate',
        age: 'invalid_age',
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('age'))
  })
  test('Should returns 500 if genreValidator throws', async () => {
    const { sut, genreValidatorStub } = makeSut()
    jest.spyOn(genreValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        lastname: 'any_lastname',
        genre: 'any_genre',
        birthdate: 'any_birthdate',
        age: 'any_age',
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should call genreValidator with correct genre', async () => {
    const { sut, genreValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(genreValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        lastname: 'any_lastname',
        genre: 'any_genre',
        birthdate: 'any_birthdate',
        age: 'any_age',
        city: 'any_city'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_genre')
  })
  test('Should return 400 if an invalid genre is provided ', async () => {
    const { sut , genreValidatorStub } = makeSut()
    jest.spyOn(genreValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        lastname: 'any_lastname',
        genre: 'invalid_genre',
        birthdate: 'any_birthdate',
        age: 'any_age',
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('genre'))
  })
  test('Should returns 500 if birthdateValidator throws', async () => {
    const { sut, birthdateValidatorStub } = makeSut()
    jest.spyOn(birthdateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        lastname: 'any_lastname',
        genre: 'any_genre',
        birthdate: 'any_birthdate',
        age: 'any_age',
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should call BirthdateValidator with correct birthdate', async () => {
    const { sut, birthdateValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(birthdateValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        lastname: 'any_lastname',
        genre: 'any_genre',
        birthdate: 'any_birthdate',
        age: 'any_age',
        city: 'any_city'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_birthdate')
  })
  test('Should return 400 if an invalid birthdate is provided ', async () => {
    const { sut , birthdateValidatorStub } = makeSut()
    jest.spyOn(birthdateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        lastname: 'any_lastname',
        genre: 'any_genre',
        birthdate: 'invalid_birthdate',
        age: 'any_age',
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('birthdate'))
  })
  test('Should call AddClient with correct values', async () => {
    const { sut, addClientStub } = makeSut()
    const addSpy = jest.spyOn(addClientStub, 'add')

    const httpRequest = {
      body: {
        name: 'valid_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      lastname: 'valid_lastname',
      genre: 'valid_genre',
      birthdate: 'valid_birthdate',
      age: 'valid_age',
      city: 'valid_city'
    })
  })
  test('Should return 500 if AddClient throws', async () => {
    const { sut, addClientStub } = makeSut()
    jest.spyOn(addClientStub,'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'valid_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      lastname: 'valid_lastname',
      genre: 'valid_genre',
      birthdate: 'valid_birthdate',
      age: 'valid_age',
      city: 'valid_city'
    })
  })
})

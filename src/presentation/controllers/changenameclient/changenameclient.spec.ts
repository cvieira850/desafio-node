import { ChangeClientNameController } from './changenameclient'
import { LoadClientById,ClientModel, InvalidParamError, serverError,ok, forbidden, ChangeClientNameModel, ChangeClientName } from './changenameclient-protocols'

const makeLoadClientById = (): LoadClientById => {
  class LoadClientByIdStub implements LoadClientById {
    async loadById (id: string): Promise<ClientModel> {
      return new Promise(resolve => resolve({
        id: 'valid_id',
        name: 'valid_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }))
    }
  }
  return new LoadClientByIdStub()
}
const makeChangeClientNameStub = (): ChangeClientName => {
  class ChangeClientNameStub implements ChangeClientName {
    async update (data: ChangeClientNameModel): Promise<ClientModel> {
      return {
        id: 'valid_id',
        name: 'new_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }
    }
  }
  return new ChangeClientNameStub()
}
interface SutTypes {
  sut: ChangeClientNameController
  loadClientByIdStub: LoadClientById
  changeClientNameStub: ChangeClientName
}
const makeSut = (): SutTypes => {
  const loadClientByIdStub = makeLoadClientById()
  const changeClientNameStub = makeChangeClientNameStub()
  const sut = new ChangeClientNameController(loadClientByIdStub, changeClientNameStub)
  return {
    loadClientByIdStub,
    changeClientNameStub,
    sut
  }
}
describe('ChangeClientName Controller', () => {
  test('Should call LoadClientById with correct values', async () => {
    const { sut, loadClientByIdStub } = makeSut()
    const loaaByIdSpy = jest.spyOn(loadClientByIdStub, 'loadById')
    await sut.handle({
      params: {
        id: 'any_id'
      },
      body: {
        name: 'any_name'
      }
    })
    expect(loaaByIdSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should return 403 if LoadClientById no id is provided ', async () => {
    const { sut, loadClientByIdStub } = makeSut()
    jest.spyOn(loadClientByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle({
      params: {
        id: 'any_id'
      },
      body: {
        name: 'any_name'
      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })
  test('Should return 500 if LoadClientById throws ',async () => {
    const { sut, loadClientByIdStub } = makeSut()
    jest.spyOn(loadClientByIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const httpResponse = await sut.handle({
      params: {
        id: 'any_id'
      },
      body: {
        name: 'any_name'
      }
    })
    expect(httpResponse).toEqual(serverError())
  })
  test('Should call ChangeClientName with correct values ', async () => {
    const { sut, changeClientNameStub } = makeSut()
    const updateSpy = jest.spyOn(changeClientNameStub, 'update')
    await sut.handle({
      params: {
        id: 'valid_id'
      },
      body: {
        name: 'new_name'
      }
    })
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      name: 'new_name'
    })
  })
  test('Should return 403 if no name is provided ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        id: 'any_id'
      },
      body: {

      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('name')))
  })
  test('Should return 500 if ChangeClientName throws ',async () => {
    const { sut, changeClientNameStub } = makeSut()
    jest.spyOn(changeClientNameStub, 'update').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const httpResponse = await sut.handle({
      params: {
        id: 'any_id'
      },
      body: {
        name: 'any_name'
      }
    })
    expect(httpResponse).toEqual(serverError())
  })
  test('Should return 200 on success ',async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        id: 'valid_id'
      },
      body: {
        name: 'new_name'
      }
    })
    expect(httpResponse).toEqual(ok({
      id: 'valid_id',
      name: 'new_name',
      lastname: 'valid_lastname',
      genre: 'valid_genre',
      birthdate: 'valid_birthdate',
      age: 'valid_age',
      city: 'valid_city'
    }))
  })
})

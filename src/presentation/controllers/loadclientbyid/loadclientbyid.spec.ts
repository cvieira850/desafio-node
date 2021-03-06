import { LoadClientByIdController } from './loadclientbyid'
import { LoadClientById,ClientModel, InvalidParamError, serverError,ok, forbidden } from './loadclientbyid-protocols'

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

interface SutTypes {
  sut: LoadClientByIdController
  loadClientByIdStub: LoadClientById
}
const makeSut = (): SutTypes => {
  const loadClientByIdStub = makeLoadClientById()
  const sut = new LoadClientByIdController(loadClientByIdStub)
  return {
    loadClientByIdStub,
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
      }
    })
    expect(loaaByIdSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should return 403 if LoadClientById returns null ', async () => {
    const { sut, loadClientByIdStub } = makeSut()
    jest.spyOn(loadClientByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle({
      params: {
        id: 'any_id'
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
      }
    })
    expect(httpResponse).toEqual(serverError())
  })
  test('Should return 200 on success ',async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        id: 'valid_id'
      }
    })
    expect(httpResponse).toEqual(ok({
      id: 'valid_id',
      name: 'valid_name',
      lastname: 'valid_lastname',
      genre: 'valid_genre',
      birthdate: 'valid_birthdate',
      age: 'valid_age',
      city: 'valid_city'
    }))
  })
})

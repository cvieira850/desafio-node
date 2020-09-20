import { LoadCityByNameController } from './loadcitybyname'
import { LoadCityByName,CityModel, InvalidParamError, serverError,ok, forbidden } from './loadcitybyname-protocols'

const makeLoadCityByName = (): LoadCityByName => {
  class LoadClientByIdStub implements LoadCityByName {
    async loadByName (name: string): Promise<CityModel> {
      return new Promise(resolve => resolve({
        id: 'valid_id',
        name: 'valid_name',
        state: 'valid_state'
      }))
    }
  }
  return new LoadClientByIdStub()
}

interface SutTypes {
  sut: LoadCityByNameController
  loadCityByNameStub: LoadCityByName
}
const makeSut = (): SutTypes => {
  const loadCityByNameStub = makeLoadCityByName()
  const sut = new LoadCityByNameController(loadCityByNameStub)
  return {
    loadCityByNameStub,
    sut
  }
}
describe('LoadCityByName Controller', () => {
  test('Should call LoadClientById with correct values', async () => {
    const { sut, loadCityByNameStub } = makeSut()
    const loaaByNameSpy = jest.spyOn(loadCityByNameStub, 'loadByName')
    await sut.handle({
      params: {
        name: 'any_name'
      }
    })
    expect(loaaByNameSpy).toHaveBeenCalledWith('any_name')
  })
  test('Should return 403 if LoadCityByName returns null ', async () => {
    const { sut, loadCityByNameStub } = makeSut()
    jest.spyOn(loadCityByNameStub, 'loadByName').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle({
      params: {
        name: 'any_name'
      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('name')))
  })
  test('Should return 500 if LoadCityByName throws ',async () => {
    const { sut, loadCityByNameStub } = makeSut()
    jest.spyOn(loadCityByNameStub, 'loadByName').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const httpResponse = await sut.handle({
      params: {
        name: 'any_name'
      }
    })
    expect(httpResponse).toEqual(serverError())
  })
  test('Should return 200 on success ',async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        name: 'any_name'
      }
    })
    expect(httpResponse).toEqual(ok({
      id: 'valid_id',
      name: 'valid_name',
      state: 'valid_state'
    }))
  })
})

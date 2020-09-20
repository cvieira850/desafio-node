import { LoadCityByStateController } from './loadcitybystate'
import { LoadCityByState,CityModel, InvalidParamError, serverError,ok, forbidden } from './loadcitybystate-protocols'

const makeLoadCityByState = (): LoadCityByState => {
  class LoadCityByStateStub implements LoadCityByState {
    async loadByState (state: string): Promise<CityModel[]> {
      return new Promise(resolve => resolve([{
        id: 'valid_id',
        name: 'valid_name',
        state: 'valid_state'
      }]))
    }
  }
  return new LoadCityByStateStub()
}

interface SutTypes {
  sut: LoadCityByStateController
  loadCityByStateStub: LoadCityByState
}
const makeSut = (): SutTypes => {
  const loadCityByStateStub = makeLoadCityByState()
  const sut = new LoadCityByStateController(loadCityByStateStub)
  return {
    loadCityByStateStub,
    sut
  }
}
describe('LoadCityByState Controller', () => {
  test('Should call LoadCityByState with correct values', async () => {
    const { sut, loadCityByStateStub } = makeSut()
    const loaaByNameSpy = jest.spyOn(loadCityByStateStub, 'loadByState')
    await sut.handle({
      params: {
        state: 'any_state'
      }
    })
    expect(loaaByNameSpy).toHaveBeenCalledWith('any_state')
  })
  test('Should return 403 if LoadCityByState returns null ', async () => {
    const { sut, loadCityByStateStub } = makeSut()
    jest.spyOn(loadCityByStateStub, 'loadByState').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle({
      params: {
        state: 'any_state'
      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('state')))
  })
  test('Should return 500 if LoadCityByState throws ',async () => {
    const { sut, loadCityByStateStub } = makeSut()
    jest.spyOn(loadCityByStateStub, 'loadByState').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const httpResponse = await sut.handle({
      params: {
        state: 'any_state'
      }
    })
    expect(httpResponse).toEqual(serverError())
  })
  test('Should return 200 on success ',async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        state: 'any_state'
      }
    })
    expect(httpResponse).toEqual(ok([{
      id: 'valid_id',
      name: 'valid_name',
      state: 'valid_state'
    }]))
  })
})

import { CityModel,LoadCityByStateRepository } from './db-load-city-by-state-protocols'
import { DbLoadCityByState } from './db-load-city-by-state'

describe('DbLoadCityByState', () => {
  interface SutTypes {
    sut: DbLoadCityByState
    loadCityByStateRepositoryStub: LoadCityByStateRepository
  }

  const makeLoadCityByStateRepository = (): LoadCityByStateRepository => {
    class LoadCityByStateRepositoryStub implements LoadCityByStateRepository {
      async loadByState (name: string): Promise<CityModel[]> {
        const fakeCity = [{
          id: 'valid_id',
          name: 'valid_name',
          state: 'valid_state'
        }]
        return new Promise(resolve => resolve(fakeCity))
      }
    }
    return new LoadCityByStateRepositoryStub()
  }
  const makeSut = (): SutTypes => {
    const loadCityByStateRepositoryStub = makeLoadCityByStateRepository()
    const sut = new DbLoadCityByState(loadCityByStateRepositoryStub)
    return {
      sut,
      loadCityByStateRepositoryStub
    }
  }
  test('Should call LoadCityByStateRepository', async () => {
    const { sut,loadCityByStateRepositoryStub } = makeSut()
    const loadByStateSpy = jest.spyOn(loadCityByStateRepositoryStub, 'loadByState')
    await sut.loadByState('any_state')
    expect(loadByStateSpy).toHaveBeenCalledWith('any_state')
  })
  test('Should return City on success', async () => {
    const { sut } = makeSut()
    const city = await sut.loadByState('any_state')
    expect(city).toEqual([{
      id: 'valid_id',
      name: 'valid_name',
      state: 'valid_state'
    }])
  })
  test('Should throw if LoadCityByStateRepository throws', async () => {
    const { sut,loadCityByStateRepositoryStub } = makeSut()
    jest.spyOn(loadCityByStateRepositoryStub,'loadByState').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.loadByState('any_state')
    await expect(promise).rejects.toThrow()
  })
})

import { CityModel,LoadCityByNameRepository } from './db-load-city-by-name-protocols'
import { DbLoadCityByName } from './db-load-city-by-name'

describe('DbLoadCityByName', () => {
  interface SutTypes {
    sut: DbLoadCityByName
    loadCityByNameRepositoryStub: LoadCityByNameRepository
  }

  const makeLoadCityByNameRepository = (): LoadCityByNameRepository => {
    class LoadCityByNameRepositoryStub implements LoadCityByNameRepository {
      async loadByName (name: string): Promise<CityModel> {
        const fakeCity = {
          id: 'valid_id',
          name: 'valid_name',
          state: 'valid_state'
        }
        return new Promise(resolve => resolve(fakeCity))
      }
    }
    return new LoadCityByNameRepositoryStub()
  }
  const makeSut = (): SutTypes => {
    const loadCityByNameRepositoryStub = makeLoadCityByNameRepository()
    const sut = new DbLoadCityByName(loadCityByNameRepositoryStub)
    return {
      sut,
      loadCityByNameRepositoryStub
    }
  }
  test('Should call LoadCityByNameRepository', async () => {
    const { sut,loadCityByNameRepositoryStub } = makeSut()
    const loadByNameSpy = jest.spyOn(loadCityByNameRepositoryStub, 'loadByName')
    await sut.loadByName('any_name')
    expect(loadByNameSpy).toHaveBeenCalledWith('any_name')
  })
  test('Should return City on success', async () => {
    const { sut } = makeSut()
    const city = await sut.loadByName('any_name')
    expect(city).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      state: 'valid_state'
    })
  })
  test('Should throw if LoadCityByNameRepository throws', async () => {
    const { sut,loadCityByNameRepositoryStub } = makeSut()
    jest.spyOn(loadCityByNameRepositoryStub,'loadByName').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.loadByName('any_name')
    await expect(promise).rejects.toThrow()
  })
})

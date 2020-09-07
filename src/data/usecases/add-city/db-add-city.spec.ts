import { DbAddCity } from './db-add-city'
import { AddCityModel,AddCityRepository,CityModel } from './db-add-city-protocols'

interface SutTypes {
  sut: DbAddCity
  addCityRepositoryStub: AddCityRepository
}
const makeAddCityRepository = (): AddCityRepository => {
  class AddCityRepositoryStub implements AddCityRepository {
    async add (cityData: AddCityModel): Promise<CityModel> {
      const fakeCity = {
        id: 'valid_id',
        name: 'valid_name',
        state: 'valid_state'
      }
      return new Promise(resolve => resolve(fakeCity))
    }
  }
  return new AddCityRepositoryStub()
}
const makeSut = (): SutTypes => {
  const addCityRepositoryStub = makeAddCityRepository()
  const sut = new DbAddCity(addCityRepositoryStub)
  return { sut, addCityRepositoryStub }
}
describe('DbAddCity Usecase', () => {
  test('Should call AddCityRepository with correct values',async () => {
    const { sut,addCityRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCityRepositoryStub,'add')
    const cityData = {
      name: 'valid_name',
      state: 'valid_state'
    }
    await sut.add(cityData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      state: 'valid_state'
    })
  })
})

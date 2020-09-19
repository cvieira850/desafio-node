import { ChangeClientNameController } from './changenameclient'
import { LoadClientById,ClientModel } from './changenameclient-protocols'

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
  sut: ChangeClientNameController
  loadClientById: LoadClientById
}
const makeSut = (): SutTypes => {
  const loadClientById = makeLoadClientById()
  const sut = new ChangeClientNameController(loadClientById)
  return {
    loadClientById,
    sut
  }
}
describe('ChangeClientName Controller', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadClientById } = makeSut()
    const loaaByIdSpy = jest.spyOn(loadClientById, 'loadById')
    await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(loaaByIdSpy).toHaveBeenCalledWith('any_id')
  })
})

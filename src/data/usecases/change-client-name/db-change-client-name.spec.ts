import { DbChangeClientName } from './db-change-client-name'
import { ClientModel,ChangeClientNameRepository ,ChangeClientNameModel } from './db-change-client-protocols'

interface SutTypes {
  sut: DbChangeClientName
  changeClientNameRepositoryStub: ChangeClientNameRepository
}
const makeChangeClientNameRepository = (): ChangeClientNameRepository => {
  class ChangeClientNameRepositoryStub implements ChangeClientNameRepository {
    async update (data: ChangeClientNameModel): Promise<ClientModel> {
      const fakeClient = {
        id: 'valid_id',
        name: 'valid_name',
        lastname: 'valid_lastname',
        genre: 'valid_genre',
        birthdate: 'valid_birthdate',
        age: 'valid_age',
        city: 'valid_city'
      }
      return new Promise(resolve => resolve(fakeClient))
    }
  }
  return new ChangeClientNameRepositoryStub()
}
const makeSut = (): SutTypes => {
  const changeClientNameRepositoryStub = makeChangeClientNameRepository()
  const sut = new DbChangeClientName(changeClientNameRepositoryStub)
  return { sut, changeClientNameRepositoryStub }
}
describe('DbChangeClientName Usecase', () => {
  test('Should call ChangeClientNameRepository with correct values',async () => {
    const { sut,changeClientNameRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(changeClientNameRepositoryStub,'update')
    const clientData = {
      id: 'valid_id',
      name: 'valid_name'
    }
    await sut.update(clientData)
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      name: 'valid_name'
    })
  })
  test('Should throw if ChangeClientNameRepository throws',async () => {
    const { sut,changeClientNameRepositoryStub } = makeSut()
    jest.spyOn(changeClientNameRepositoryStub,'update').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const clientData = {
      id: 'valid_id',
      name: 'valid_name'
    }
    const promise = sut.update(clientData)
    await expect(promise).rejects.toThrow()
  })
  test('Should return Client on success', async () => {
    const { sut } = makeSut()
    const client = await sut.update({
      id: 'valid_id',
      name: 'valid_name'
    })
    expect(client).toEqual({
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

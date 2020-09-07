import { DbAddClient } from './db-add-client'
import { AddClientModel,AddClientRepository,ClientModel } from './db-add-client-protocols'

interface SutTypes {
  sut: DbAddClient
  addClientRepositoryStub: AddClientRepository
}
const makeAddClientRepository = (): AddClientRepository => {
  class AddCityRepositoryStub implements AddClientRepository {
    async add (clientData: AddClientModel): Promise<ClientModel> {
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
  return new AddCityRepositoryStub()
}
const makeSut = (): SutTypes => {
  const addClientRepositoryStub = makeAddClientRepository()
  const sut = new DbAddClient(addClientRepositoryStub)
  return { sut, addClientRepositoryStub }
}
describe('DbAddCity Usecase', () => {
  test('Should call AddClientRepository with correct values',async () => {
    const { sut,addClientRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addClientRepositoryStub,'add')
    const clientData = {
      name: 'valid_name',
      lastname: 'valid_lastname',
      genre: 'valid_genre',
      birthdate: 'valid_birthdate',
      age: 'valid_age',
      city: 'valid_city'
    }
    await sut.add(clientData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      lastname: 'valid_lastname',
      genre: 'valid_genre',
      birthdate: 'valid_birthdate',
      age: 'valid_age',
      city: 'valid_city'
    })
  })
  test('Should throw if AddClientRepository throws',async () => {
    const { sut,addClientRepositoryStub } = makeSut()
    jest.spyOn(addClientRepositoryStub,'add').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const clientData = {
      name: 'valid_name',
      lastname: 'valid_lastname',
      genre: 'valid_genre',
      birthdate: 'valid_birthdate',
      age: 'valid_age',
      city: 'valid_city'
    }
    const promise = sut.add(clientData)
    await expect(promise).rejects.toThrow()
  })
  test('Should return an client on success',async () => {
    const { sut } = makeSut()
    const clientData = {
      name: 'valid_name',
      lastname: 'valid_lastname',
      genre: 'valid_genre',
      birthdate: 'valid_birthdate',
      age: 'valid_age',
      city: 'valid_city'
    }
    const client = await sut.add(clientData)
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

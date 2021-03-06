import { ClientModel,LoadClientByIdRepository } from './db-load-client-by-id-protocols'
import { DbLoadClientById } from './db-load-client-by-id'

describe('DbLoadClientById', () => {
  interface SutTypes {
    sut: DbLoadClientById
    loadClientByIdRepositoryStub: LoadClientByIdRepository
  }

  const makeLoadClientByIdRepository = (): LoadClientByIdRepository => {
    class LoadClientByIdRepositoryStub implements LoadClientByIdRepository {
      async loadById (id: string): Promise<ClientModel> {
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
    return new LoadClientByIdRepositoryStub()
  }
  const makeSut = (): SutTypes => {
    const loadClientByIdRepositoryStub = makeLoadClientByIdRepository()
    const sut = new DbLoadClientById(loadClientByIdRepositoryStub)
    return {
      sut,
      loadClientByIdRepositoryStub
    }
  }
  test('Should call LoadClientByIdRepository', async () => {
    const { sut,loadClientByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadClientByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should return Client on success', async () => {
    const { sut } = makeSut()
    const client = await sut.loadById('any_id')
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
  test('Should throw if LoadClientByIdRepository throws', async () => {
    const { sut,loadClientByIdRepositoryStub } = makeSut()
    jest.spyOn(loadClientByIdRepositoryStub,'loadById').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})

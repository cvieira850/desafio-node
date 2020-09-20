import { DeleteClientRepository } from './db-delete-client-protocols'
import { DbDeleteClient } from './db-delete-client'

describe('DbLoadClientById', () => {
  interface SutTypes {
    sut: DbDeleteClient
    deleteClientRepository: DeleteClientRepository
  }

  const makeDeleteClientRepository = (): DeleteClientRepository => {
    class DeleteClientRepositoryStub implements DeleteClientRepository {
      async delete (id: string): Promise<null> {
        return new Promise(resolve => resolve(null))
      }
    }
    return new DeleteClientRepositoryStub()
  }
  const makeSut = (): SutTypes => {
    const deleteClientRepository = makeDeleteClientRepository()
    const sut = new DbDeleteClient(deleteClientRepository)
    return {
      sut,
      deleteClientRepository
    }
  }
  test('Should call DeleteClientRepository', async () => {
    const { sut,deleteClientRepository } = makeSut()
    const deleteSpy = jest.spyOn(deleteClientRepository, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should return Client on success', async () => {
    const { sut } = makeSut()
    const resp = await sut.delete('any_id')
    expect(resp).toEqual(null)
  })
  test('Should throw if DeleteClientRepository throws', async () => {
    const { sut,deleteClientRepository } = makeSut()
    jest.spyOn(deleteClientRepository,'delete').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.delete('any_id')
    await expect(promise).rejects.toThrow()
  })
})

import { DeleteClientController } from './deleteclient'
import { DeleteClient, serverError,ok } from './deleteclient-protocols'

const makeDeleteClient = (): DeleteClient => {
  class DeleteClientStub implements DeleteClient {
    async delete (id: string): Promise<null> {
      return null
    }
  }
  return new DeleteClientStub()
}

interface SutTypes {
  sut: DeleteClientController
  deleteClientStub: DeleteClient
}
const makeSut = (): SutTypes => {
  const deleteClientStub = makeDeleteClient()
  const sut = new DeleteClientController(deleteClientStub)
  return {
    deleteClientStub,
    sut
  }
}
describe('DeleteClient Controller', () => {
  test('Should call DeleteClient with correct values', async () => {
    const { sut, deleteClientStub } = makeSut()
    const deleteClientSpy = jest.spyOn(deleteClientStub, 'delete')
    await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(deleteClientSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should return 500 if DeleteClient throws ',async () => {
    const { sut, deleteClientStub } = makeSut()
    jest.spyOn(deleteClientStub, 'delete').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const httpResponse = await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(httpResponse).toEqual(serverError())
  })
  test('Should return 200 on success ',async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        id: 'valid_id'
      }
    })
    expect(httpResponse).toEqual(ok(null))
  })
})

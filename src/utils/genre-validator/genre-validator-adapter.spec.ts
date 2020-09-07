import { GenreValidatorAdapter } from './genre-validator-adapter'
import { GenreValidatorInterface } from '../../infra/validators/genre-validator/protocols/genre-validator'

interface SutTypes {
  sut: GenreValidatorAdapter
  genreValidatorStub: GenreValidatorInterface
}

const makeGenreValidator = (): GenreValidatorInterface => {
  class GenreValidatorLibStub {
    isGenre (genre: string): boolean {
      return true
    }
  }
  return new GenreValidatorLibStub()
}
const makeSut = (): SutTypes => {
  const genreValidatorStub = makeGenreValidator()

  const sut = new GenreValidatorAdapter(genreValidatorStub)
  return {
    sut,genreValidatorStub
  }
}

describe('GenreValidatorAdapter', () => {
  test('Should return false if genre validator returns false', () => {
    const { sut,genreValidatorStub } = makeSut()
    jest.spyOn(genreValidatorStub,'isGenre').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid-genre')
    expect(isValid).toBe(false)
  })
  test('Should return true if genre validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('valid-genre')
    expect(isValid).toBe(true)
  })

  test('Should calls age validator with correct genre', () => {
    const { sut, genreValidatorStub } = makeSut()
    const spyIsBirth = jest.spyOn(genreValidatorStub, 'isGenre')
    sut.isValid('valid-genre')
    expect(spyIsBirth).toBeCalledWith('valid-genre')
  })
})

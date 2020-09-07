import { GenreValidator } from '../../presentation/protocols/genre-validator'
import { GenreValidatorLib } from '../../infra/validators/genre-validator/genre-validator'
export class GenreValidatorAdapter implements GenreValidator {
  protected readonly genreValidatorLib: GenreValidatorLib
  constructor (genreValidatorLib: GenreValidatorLib) {
    this.genreValidatorLib = genreValidatorLib
  }

  isValid (genre: string): boolean {
    return this.genreValidatorLib.isGenre(genre)
  }
}

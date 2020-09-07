import { GenreValidatorInterface } from './protocols/genre-validator'

export class GenreValidatorLib implements GenreValidatorInterface {
  isGenre (genre: string): boolean {
    switch (genre) {
      case 'female':
        return true
      case 'male':
        return true
      case 'prefer not to say':
        return true
      default :
        return false
    }
  }
}

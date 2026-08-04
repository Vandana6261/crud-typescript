export interface CreateMovieDTO {
  movieName: string;
  country: string;
  genre: string;
  whereToWatch: string;
  rating: number;
  releasedYear?: number;
}
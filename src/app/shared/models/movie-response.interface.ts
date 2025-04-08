import { Movie } from "./movie.interface";
import { Pageable } from "./pageable.interface";
import { Sort } from "./sort.interface";

export interface MovieResponse {
  content: Movie[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IBook} from "../interfaces/book";
import {Observable} from "rxjs";

// Get the server url based on the environment we are running
const SERVER_UL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Retrieving all books.
   */
  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(SERVER_UL + 'books');
  }

  /**
   * Retrieving a book by id.
   * @param id
   */
  getBookById(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${SERVER_UL + 'books'}/${id}`);
  }

}

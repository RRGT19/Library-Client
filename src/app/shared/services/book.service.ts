import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IBook, IBookPage} from "../interfaces/book";
import {Observable} from "rxjs";
import {LoadingService} from "./loading.service";
import {finalize} from "rxjs/operators";

// Get the server url based on the environment we are running
const SERVER_UL = environment.apiUrl;

// Combine the endpoint url with the SERVER_UL for easy changes
const COMBINE_URL = (target: string) => {
  return SERVER_UL + target;
};

@Injectable({
  providedIn: 'root'
})
export class BookService extends LoadingService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  /**
   * Retrieving all books.
   */
  getBooks(): Observable<IBook[]> {
    this.showLoading();
    return this.http.get<IBook[]>(COMBINE_URL('books'))
      .pipe(
        finalize(() => this.hideLoading())
      );
  }

  /**
   * Retrieving a book by id.
   * @param id
   */
  getBookById(id: string): Observable<IBook> {
    this.showLoading();
    return this.http.get<IBook>(COMBINE_URL(`books/${id}`))
      .pipe(
        finalize(() => this.hideLoading())
      );
  }

  /**
   * Get pages of a book.
   * @param bookId  The book id.
   * @param from    Starting from.
   * @param to      Until.
   */
  getBookPages(bookId: string, from: number, to: number): Observable<IBookPage[]> {
    this.showLoading();
    const byBookId = `bookId=${bookId}`;
    //const pageRange = `pageNumber=^[${from}-${to}]?$|^${to}$`; // Using a regex pattern.
    const pageRange = `pageNumber=^([${from}-${to}]|([1-${to}][${from}-${to}])|${to})$`; // Using a regex pattern.
    return this.http.get<IBookPage[]>(COMBINE_URL(`pages?${byBookId}&${pageRange}`))
      .pipe(
        finalize(() => this.hideLoading())
      );
  }

}

import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Observable} from "rxjs";
import {IBook} from "../interfaces/book";

/**
 * Angular in-memory-web-api module to create a backend-less application by mocking Rest API with common CRUD operations.
 * This module provides an in memory data store where we can fetch data and simulates a real Rest API backend.
 * It intercepts Angular HttpClient requests that would otherwise go to the remote server and redirects them
 * to this fake backend service.
 */

@Injectable({
  providedIn: 'root'
})
export class BookFakeService implements InMemoryDbService {

  constructor() {
  }

  createDb(): {} | Observable<{}> | Promise<{}> {
    const books: IBook[] = [
      {
        id: 1,
        title: 'Punishment',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        by: 'Robert',
        genre: 'Classic',
        cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1382846449l/7144.jpg',
        publishedAt: 'Nov 12'
      },
      {
        id: 2,
        title: 'Punishment',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        by: 'Robert',
        genre: 'Classic',
        cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1403173986l/1845.jpg',
        publishedAt: 'Nov 12'
      },
      {
        id: 3,
        title: 'Punishment',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        by: 'Robert',
        genre: 'Classic',
        cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1382846449l/7144.jpg',
        publishedAt: 'Nov 12'
      },
      {
        id: 4,
        title: 'Punishment',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
        by: 'Robert',
        genre: 'Classic',
        cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1403173986l/1845.jpg',
        publishedAt: 'Nov 12'
      },
    ];

    return {books};
  }

}

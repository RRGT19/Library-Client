import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Observable} from "rxjs";
import {IBook} from "../interfaces/book";
import * as faker from 'faker/locale/en';

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
    const books = (count = faker.random.numer(4)) => {
      const res: IBook[] = [];
      for (let i = 0; i < count; i++) {
        res.push(this.oneBook());
      }
      return res;
    };

    return {books};
  }

  oneBook(): IBook {
    return {
      id: faker.random.uuid(),
      title: faker.random.words,
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
      by: faker.name.findName,
      genre: 'Classic',
      cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1403173986l/1845.jpg',
      publishedAt: new Date(faker.date.past)
    };
  }

}

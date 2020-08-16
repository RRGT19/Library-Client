import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Observable} from "rxjs";
import {IBook, IBookPage} from "../interfaces/book";
import * as faker from 'faker/locale/en_US';

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

  paragraphs = [
    "<b>Sit repellat minima omnis voluptate placeat beatae. Nostrum sint velit minus molestiae similique adipisci.</b> " +
    "<i>Est reiciendis provident. Labore corrupti ad est dolor non quaerat mollitia error.</i> " +
    "Modi dolorem est iure tempora minus eveniet doloribus nihil et. " +
    "Itaque omnis molestiae voluptatem voluptates sed consequatur voluptas optio. " +
    "Animi et accusantium qui quidem. In sit autem repellat sequi quis recusandae officia. " +
    "Voluptas consequuntur enim consequuntur eum rerum iusto harum quia occaecati. " +
    "<strong>Itaque voluptate optio itaque itaque mollitia omnis. Eos aspernatur sequi corrupti distinctio ut expedita quae. " +
    "Non ea voluptates velit quidem. Ducimus et dolores. Accusamus fuga quibusdam.</strong>",
    "<strong>Quod enim quis. Ut aspernatur harum accusamus adipisci ab voluptates cupiditate est. Et doloremque autem dolore.</strong> " +
    "Et omnis exercitationem vero asperiores est. Placeat hic est nostrum nihil similique ea voluptas architecto. " +
    "Quo minus voluptatem provident sit nam hic. Non hic rem consectetur doloremque ut. Asperiores est beatae. " +
    "<small>Tempora esse incidunt animi qui. Sit nostrum laboriosam corrupti quis.</small>"
  ];

  constructor() {
  }

  createDb(): {} | Observable<{}> | Promise<{}> {
    const books = this.generateBooks();
    const pages = this.generateBookPages(books);
    console.log(books);
    console.log(pages);
    return {books, pages};
  }

  /**
   * Books
   */

  generateBooks(count = 8): IBook[] {
    let res: IBook[] = [];
    for (let i = 0; i < count; i++) {
      res.push(this.oneBook());
    }
    return res;
  };

  oneBook(): IBook {
    return {
      id: faker.random.uuid(),
      title: this.capitalizeFirstLetter(faker.lorem.word()),
      description: faker.lorem.sentence(),
      by: faker.name.findName(),
      genre: faker.name.jobArea(),
      cover: faker.random.image(),
      publishedAt: new Date(faker.date.past())
    };
  }

  /**
   * Book pages
   */

  generateBookPages(books: IBook[], count = 5): IBookPage[] {
    let res: IBookPage[] = [];
    books.forEach(book => {
      for (let i = 0; i < count; i++) {
        res.push(this.oneBookPage(book.id, i));
      }
    });
    return res;
  };

  oneBookPage(bookId: string, pageNumber: number): IBookPage {
    return {
      bookId: bookId,
      pageNumber: pageNumber,
      content: this.getPageContent()
    };
  }

  getPageContent(paragraphsCount = 6): string {
    let pageContent = "";
    for (let i = 0; i < paragraphsCount; i++) {
      pageContent += faker.random.arrayElement(this.paragraphs) + "<br><br>";
    }
    return pageContent;
  }

  /**
   * Utilities
   */

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}

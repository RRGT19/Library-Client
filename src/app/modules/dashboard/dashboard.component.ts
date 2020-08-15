import {Component} from '@angular/core';
import {BookService} from "../../shared/services/book.service";

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  /**
   * Get the list of books.
   * The template will unsubscribe automatically when the component is destroyed.
   */
  books$ = this.bookService.getBooks();

  constructor(
    private bookService: BookService
  ) {
  }

}

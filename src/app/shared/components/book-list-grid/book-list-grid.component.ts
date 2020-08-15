import {Component, Input, OnInit} from '@angular/core';
import {IBook} from "../../interfaces/book";

/**
 * This component builds a grid to show a list of books.
 * The single responsibility of this component is to establish the col size to its childs.
 */

@Component({
  selector: 'app-book-list-grid',
  templateUrl: './book-list-grid.component.html',
  styleUrls: ['./book-list-grid.component.scss']
})
export class BookListGridComponent implements OnInit {

  @Input() books: IBook[];

  ngOnInit(): void {
    this.validateInputProps();
  }

  validateInputProps() {
    if (!this.books) {
      throw new TypeError("You must pass a list of books.");
    }
  }

}

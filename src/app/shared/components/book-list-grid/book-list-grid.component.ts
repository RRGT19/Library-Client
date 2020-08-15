import {Component, Input, OnInit} from '@angular/core';
import {IBook} from "../../interfaces/book";
import {fadeInOutAnimation} from "../../animations/fadeInOut.animation";

/**
 * This component builds a grid to show a list of books.
 * The single responsibility of this component is to establish the col size to its childs.
 */

@Component({
  selector: 'app-book-list-grid',
  templateUrl: './book-list-grid.component.html',
  styleUrls: ['./book-list-grid.component.scss'],
  animations: [fadeInOutAnimation]
})
export class BookListGridComponent implements OnInit {

  @Input() books: IBook[];
  @Input() withColSizeOptions: boolean = true;
  colSize: number = 6; // Col size by default in case "withColSizeOptions" is marked as disabled

  ngOnInit(): void {
    this.validateInputProps();
  }

  validateInputProps() {
    if (!this.books) {
      throw new TypeError("You must pass a list of books.");
    }
  }

  changeColSize(size: number) {
    this.colSize = size;
  }

}

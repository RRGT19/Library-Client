import {Component, Input, OnInit} from '@angular/core';
import {IBook} from "../../interfaces/book";
import {Router} from "@angular/router";

/**
 * This component is responsible of the design of a book's card.
 * The design of a card is independent of the col size that the parent assigned to it.
 * This means that the design should adjust to any col size or maybe to some of the sizes available.
 */

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book: IBook;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.validateInputProps();
  }

  validateInputProps() {
    if (!this.book) {
      throw new TypeError("You must pass a book object.");
    }
  }

  open() {
    this.router.navigateByUrl('/book/' + this.book.id);
  }

}

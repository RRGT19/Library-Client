import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ICommonViewer} from "../../shared/interfaces/functionalities";
import {BookService} from "../../shared/services/book.service";
import {IBook, IBookPage} from "../../shared/interfaces/book";
import {forkJoin, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy, ICommonViewer {

  book: IBook;
  bookPage: IBookPage[];
  pageBeingViewed: IBookPage;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public bookService: BookService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.params['id'];
    this.fetchData(bookId);
  }

  fetchData(bookId: string) {
    // Performs multiple Http requests.
    forkJoin([
      this.bookService.getBookById(bookId),
      this.bookService.getBookPages(bookId, 0, 2)
    ]).subscribe(res => {
      this.book = res[0];
      this.bookPage = res[1];
      this.pageBeingViewed = this.bookPage[0];
      console.log(res);
    });
  }

  htmlText(text: string) {
  }

  plainText(text: string) {
  }

  ngOnDestroy(): void {
    // Avoid memory leaks.
    this.subscription.unsubscribe();
  }

}

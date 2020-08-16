import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ICommonViewer} from "../../shared/interfaces/functionalities";
import {BookService} from "../../shared/services/book.service";
import {IBook, IBookPage} from "../../shared/interfaces/book";
import {forkJoin} from "rxjs";
import {Location} from '@angular/common';
import Utils from "../../shared/utilities/Utils";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, ICommonViewer {

  book: IBook;
  bookPages: IBookPage[];
  showErrorMessage: boolean = false;

  // Keep track of the view mode selected
  viewerMode: string = 'HTML';

  // Pagination
  currentPage = 0;
  pageBeingViewed: IBookPage;
  noMorePagesMessage: string;

  constructor(
    private route: ActivatedRoute,
    public bookService: BookService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.params['bookId'];
    this.fetchData(bookId);
  }

  // convenience getter for easy access to some logic
  get shouldShowNoMoreMessage(): boolean {
    return !!this.noMorePagesMessage && this.currentPage === (this.bookPages.length - 1);
  }

  /**
   * Fetch the data that this component needs of a book.
   * @param bookId
   */
  fetchData(bookId: string): void {
    // Performs multiple Http requests.
    forkJoin([
      this.bookService.getBookById(bookId),
      this.bookService.getBookPages(bookId, this.currentPage, 2)
    ]).subscribe(
      // Success handler function, which is called each time that the stream emits a value
      res => {
        this.book = res[0];
        console.log(`Fetching pages. From: ${this.currentPage}, To: 2`)
        this.bookPages = res[1];
        this.pageBeingViewed = Utils.deepCopy(this.bookPages[0]); // Deep copy
      },
      // Error handler function, that gets called only if an error occurs. This handler receives the error itself.
      err => {
       this.showErrorMessage = true;
      }
    );
  }

  /**
   * Implementation to show content back to HTML.
   */
  htmlText(): void {
    this.viewerMode = 'HTML';
    this.pageBeingViewed.content =
      Utils.deepCopy(
        this.bookPages
          .find(p => p.pageNumber === this.currentPage)
          .content
      );
  }

  /**
   * Implementation to show content in plain text.
   * Uses regular expression.
   * @param keepLineBreaks  Decide if we should keep line breaks for best reading experience.
   */
  plainText(keepLineBreaks: boolean = true): void {
    this.viewerMode = 'PLAIN';
    this.pageBeingViewed.content = Utils.deepCopy(
      this.bookPages
        .find(p => p.pageNumber === this.currentPage)
        .content
        .replace(keepLineBreaks ? /<(?!br\s*\/?)[^>]+>/g : /<[^>]*>/g, '')
    );
  }

  /**
   * Change the content to use the view mode selected previously.
   */
  changeViewMode() {
    if (this.viewerMode === 'HTML') {
      this.htmlText();
    } else {
      this.plainText()
    }
  }

  /**
   * Logic to change the book page.
   * @param to Page number that we want to read.
   */
  changePage(to: number): void {
    if (to === this.currentPage) {
      return;
    }

    // Find the page locally
    const nextPage = this.bookPages.find(p => p.pageNumber === to);

    if (nextPage) {

      // Change the content
      console.log(`Changing page. From: ${this.currentPage}, To: ${to}`);
      this.pageBeingViewed = Utils.deepCopy(nextPage);
      this.currentPage = to;
      // Use the view mode selected before
      this.changeViewMode();
      // Change the page number in the URL to provide the effect to the user
      this.location.replaceState(`book/${this.book.id}/page/${this.currentPage}`);

    } else {

      console.log(`Fetching more pages. From: ${this.currentPage}, To: ${this.currentPage + 2}`)

      // 1. Fetch more pages
      this.bookService.getBookPages(this.book.id, to, this.currentPage + 2)
        // Convert to Promise to avoid keeping track of subscriptions (simplicity for this scenario)
        .toPromise()
        .then((pages: IBookPage[]) => {

          if (pages.length > 0) {
            // 2. Add them locally
            pages.forEach(newPage => this.bookPages.push(newPage));
            // 3. Change page (calling this method recursively)
            this.changePage(to);
          } else {
            this.noMorePagesMessage = 'You saw the last page available for this book. Get some rest or read another one.'
          }

        })

    }

    // Scroll to top
    window.scroll(0, 0);
  }

}

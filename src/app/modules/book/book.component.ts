import {Component, HostListener, OnInit} from '@angular/core';
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
  showBookNotFound: boolean = false;
  showPageNotFound: boolean = false;

  // Keep track of the view mode selected
  viewerMode: string = 'HTML';

  // Pagination
  currentPage = 0;
  pageBeingViewed: IBookPage;
  showNoMorePages: boolean = false;

  // Scroll to top
  showGoToTopBtn: boolean;
  topPosToStartShowing = 100;

  constructor(
    private route: ActivatedRoute,
    public bookService: BookService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.params['bookId'];
    this.currentPage = +this.route.snapshot.params['pageNumber'];
    this.fetchData(bookId);
  }

  // convenience getter for easy access to some logic
  get shouldShowNoMoreMessage(): boolean {
    return !!this.showNoMorePages && this.currentPage === (this.bookPages.length - 1);
  }

  /**
   * Fetch the data that this component needs of a book.
   * @param bookId
   */
  fetchData(bookId: string): void {
    const from = 0;
    const to = this.currentPage > 0 ? (this.currentPage + 1) : 2;
    console.log(`Fetching pages. From: ${from}, To: ${to}`)

    // Performs multiple Http requests.
    forkJoin([
      this.bookService.getBookById(bookId),
      this.bookService.getBookPages(bookId, from, to)
    ]).subscribe(
      // Success handler function, which is called each time that the stream emits a value
      res => {
        this.book = res[0];
        this.bookPages = res[1];
        const pageNumberExists = this.bookPages.some(p => p.pageNumber === this.currentPage);
        if (pageNumberExists) {
          this.pageBeingViewed = Utils.deepCopy(this.bookPages[this.currentPage]); // Deep copy
        } else {
          console.log('Page number not found.');
          this.showPageNotFound = true;
          this.changePage(this.bookPages.length - 1);
        }
      },
      // Error handler function, that gets called only if an error occurs. This handler receives the error itself.
      err => {
        this.showBookNotFound = true;
      }
    );
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
      // Update the browser URL
      this.replaceUrl();

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
            this.showPageNotFound = false;
            this.showNoMorePages = true;
          }

        })

    }

    this.goToTop();
  }

  /**
   * Change the page number in the URL to provide the effect to the user.
   */
  replaceUrl() {
    this.location.replaceState(`book/${this.book.id}/page/${this.currentPage}`);
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
   * Listen the scroll of the window to show/hide the button in template.
   */
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showGoToTopBtn = scrollPosition >= this.topPosToStartShowing;
  }

  /**
   * Go to the top smoothly.
   */
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

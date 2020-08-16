import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Pagination component that takes care of listing the page numbers,
 * and to notify the parent when the user clicks on a page.
 */

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  perPageOptions: Array<number> = [5, 10, 20];

  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() itemsLength: number;
  @Output() currentPageChanged = new EventEmitter<number>();
  @Output() itemsPerPageChanged = new EventEmitter<number>();

  constructor() {
  }

}

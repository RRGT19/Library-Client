import {Component, EventEmitter, OnInit, Output} from '@angular/core';

interface IColSize {
  title: string;
  icon: string;
  value: number;
  isDefault: boolean;
}

@Component({
  selector: 'app-col-size-buttons',
  templateUrl: './col-size-buttons.component.html',
  styleUrls: ['./col-size-buttons.component.scss']
})
export class ColSizeButtonsComponent implements OnInit {

  @Output() colSizeHasChanged = new EventEmitter<number>();
  colSizes: IColSize[] = [
    {
      title: '12',
      value: 12,
      icon: 'assets/icons/row-12.png',
      isDefault: false
    },
    {
      title: '6',
      value: 6,
      icon: 'assets/icons/row-6.png',
      isDefault: true
    },
    {
      title: '4',
      value: 4,
      icon: 'assets/icons/row-4.png',
      isDefault: false
    },
  ];

  ngOnInit() {
    // Emit the default value to the parent so it can adjust the col sizes.
    this.changeColSize(this.colSizes.find(col => col.isDefault).value);
  }

  /**
   * Notify the parent that the user changed the col size.
   * @param size
   */
  changeColSize(size: number) {
    this.colSizeHasChanged.emit(size);
  }

}

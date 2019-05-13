import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() headers: Array<string>;
  @Input() keysOrdered: Array<string>;
  @Input() data: Array<object>;
  @Input() indexes: boolean;
  @Input() actionButtons: boolean;
  @Output() editClicked: EventEmitter<number | string> = new EventEmitter;
  @Output() deleteClicked: EventEmitter<number | string> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  public editButtonClicked(id){
    this.editClicked.emit(id)
  }

  public deleteButtonClicked(id){
    this.deleteClicked.emit(id)
  }
}

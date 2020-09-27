import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.css']
})
export class DropdownButtonComponent {
  @Input() options: DropdownOptions;
  @Output() changed = new EventEmitter();

  onChange(value: DropdownItem) {
    this.options.selectedItem = value;
    this.changed.emit();
  }
}

export class DropdownOptions {
  constructor(
    public id: string,
    public text: string,
    public items: DropdownItem[],
    public selectedItem: DropdownItem = undefined) {

  }
}

export class DropdownItem {
  value: any;
  description: string;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() options: SearchOptions;
  @Output() search = new EventEmitter();

  onSearch() {
    this.search.emit();
  }
}

export class SearchOptions {
  constructor(
    public buttonText,
    public items: SearchItem[]) { }
}

export class SearchItem {
  constructor(
    public text: string,
    public placeholder: string,
    public hint: string,
    public control: FormControl) { }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-slider',
  templateUrl: './dropdown-slider.component.html',
  styleUrls: ['./dropdown-slider.component.css']
})
export class DropdownSliderComponent {
  @Input() options: DropdownSliderOptions;
  @Output() changed = new EventEmitter();
  value: number;

  onChange(reset: boolean) {
    this.options.value = reset ? undefined : this.options.currentValue;
    this.options.currentText = this.options.formatText(reset);
    this.changed.emit();
  }
}

export class DropdownSliderOptions {
  currentValue: number;
  currentText: string;
  menuId: string;

  constructor(
    public id: string,
    public text: string,
    public description: string,
    public min: number,
    public max: number,
    public value: number = undefined,
    public valueFormater: (value: number) => string = undefined,
    public textFormater: (value: number) => string = undefined) {
    if (max <= min)
      throw new Error("The maximal value must be greater than the minimal value");
    if (value && (min > value || max < value))
      throw new Error("The value must be greater than or equal to the minimal value and less than or equal to the maximal value");

    this.currentValue = value;
    this.currentText = text;
    this.menuId = id + "Menu";
  }

  formatText(reset: boolean) : string {
    if (reset)
      return this.text;
    if (this.textFormater)
      return this.textFormater(this.value);
    return this.value.toString();
  }
}

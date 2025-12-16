import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  standalone: false,
  selector: 'app-toggleable-card',
  templateUrl: './toggleable-card.component.html',
  styleUrls: ['./toggleable-card.component.less'],
  animations: [
    trigger('slideToggle', [
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          overflow: 'visible',
        })
      ),
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      transition('expanded <=> collapsed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ToggleableCardComponent {
  @Input() title = 'Card';
  @Input() showAddButton = false;
  @Input() isPadding = true;
  @Input() addButtonText = '+ Thêm';
  @Output() onAdd = new EventEmitter<void>();
  
  collapsed = false;

  get isCardExpanded() {
    return !this.collapsed;
  }

  handleAddClick(event: Event) {
    event.stopPropagation(); // Prevent toggle when clicking add button
    this.onAdd.emit();
  }
}
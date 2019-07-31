import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  @Output()
  primaryClick = new EventEmitter();

  @Input()
  pageTitle: string;

  @Input()
  icon: string;
}
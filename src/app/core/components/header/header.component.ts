import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titleHeader = '';
  constructor() {}

  ngOnInit() {}

  get isPublic(): boolean {
    return this.titleHeader === 'PUBLIC';
  }
}

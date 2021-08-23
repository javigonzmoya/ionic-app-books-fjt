import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  langs: string[] = [];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('langeSelect') langeSelect: ElementRef;
  lanSelect = '';
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.langs = this.translate.getLangs();
    this.lanSelect = this.translate.getDefaultLang();
    this.selectLang(this.lanSelect);
  }

  selectLang(lan: string) {
    this.translate.use(lan);
  }
}

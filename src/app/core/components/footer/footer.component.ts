import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalDataService } from '../../services/local-data.service';

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
  constructor(
    private translate: TranslateService,
    private ionStorage: LocalDataService
  ) {}

  async ngOnInit() {
    this.langs = this.translate.getLangs();
    const lan = await this.ionStorage.get('lan');

    this.lanSelect = lan || this.translate.getDefaultLang();
  }

  selectLang(lan: string) {
    this.translate.use(lan);
    this.translate.setDefaultLang(lan);
    this.ionStorage.set('lan', lan);
  }
}

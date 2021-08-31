import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalDataService } from './core/services/local-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private ionStorage: LocalDataService
  ) {}

  async ngOnInit() {
    await this.ionStorage.init();
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('en');
    const lan = await this.ionStorage.get('lan');
    const lanSelect = lan || this.translate.getDefaultLang();
    this.translate.use(lanSelect);
  }
}

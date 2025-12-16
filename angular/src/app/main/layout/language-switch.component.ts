import { ConfigStateService, SessionStateService } from '@abp/ng.core';
import { Component, Injector, OnInit } from '@angular/core';
import { AppBaseComponent } from '../../shared/components/base-component/base-component';
import { SelectItem } from 'primeng/api';
import { map, tap } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styles: [`
    #lang-switch {
      height: 40px;
      line-height: 40px;
    }

    #lang-items-wrapper {

      .lang-item {
        padding: 4px 8px;
        cursor: pointer;
      }

      ::ng-deep .p-menu-item:not(.p-disabled) .p-menu-item-content:has(.lang-item-active) {
        color: var(--p-menu-item-focus-color);
        background: var(--p-menu-item-focus-background);
      }
    }
  `],
})
export class LanguageSwitchComponent extends AppBaseComponent implements OnInit {
  languages: SelectItem[];
  currentLanguage: string;

  constructor(
    injector: Injector,
    private configState: ConfigStateService,
    private sessionStateService: SessionStateService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.currentLanguage = this.sessionStateService.getLanguage();
    this.configState.getDeep$('localization.languages')
      .pipe(
        map((langOptions: any[]) => Array.from(new Map(langOptions.map((item: any) => [item.cultureName, item])).values())),
        tap((langOptions: any[]) => {
          this.languages = langOptions.map((lang: any) => ({
            label: lang.displayName, value: lang.cultureName, icon: `assets/images/flag-of-${lang.uiCultureName}.png`
          }));
        })
      ).subscribe();
  }

  changeLang(lang: string) {
    this.sessionStateService.setLanguage(lang);
  }
}

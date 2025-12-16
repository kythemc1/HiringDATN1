import { Component, Injector } from '@angular/core';
import { AppBaseComponent } from '../../shared/components/base-component/base-component';

@Component({
  standalone: false,
  selector: 'app-header-notification',
  templateUrl: './header-notification.component.html',
  styles: [`
    :host {
      padding-right: 8px;
      padding-left: 8px;
    }

    #notification-icon {
      height: 40px;
      width: 32px;
      line-height: 44px;
      text-align: center;

      > i {
        font-size: 16px;
      }
    }
  `],
})
export class HeaderNotificationComponent extends AppBaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}

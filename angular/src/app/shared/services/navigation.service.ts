import { Injectable } from '@angular/core';
import { AppMenu, AppMenuItem } from '../models';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  constructor() { }

  getMenu(): AppMenuItem[] {
    return [
      new AppMenuItem('Bảng thống kê', '', null, '/main/dashboard'),

      new AppMenuItem('Danh mục chung', '', null, '', [
        new AppMenuItem('Ai model config', '', null, '/main/danh-muc-chung/ai-model-config'),
      ]),

     
    ];
  }
}

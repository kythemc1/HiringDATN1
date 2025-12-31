import { Injectable } from '@angular/core';
import { AppMenu, AppMenuItem } from '../models';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  constructor() { }

  getMenu(): AppMenuItem[] {
    return [
      new AppMenuItem('Bảng thống kê', '', null, '/main/dashboard'),

      // new AppMenuItem('Danh mục chung', '', null, '', [
      //   new AppMenuItem('Ai model config', '', null, '/main/danh-muc-chung/ai-model-config'),
      // ]),
      new AppMenuItem('Danh mục chung', '', null, '', [
        new AppMenuItem('Agent thinking log', '', null, '/main/danh-muc-chung/agent-thinking-log'),
        new AppMenuItem('Ai model config', '', null, '/main/danh-muc-chung/ai-model-config'),
        new AppMenuItem('Ai prompt template', '', null, '/main/danh-muc-chung/ai-prompt-template'),
        new AppMenuItem('Candidate project', '', null, '/main/danh-muc-chung/candidate-project'),
        new AppMenuItem('Candidate profile', '', null, '/main/danh-muc-chung/candidate-profile'),
        new AppMenuItem('Certificate definition', '', null, '/main/danh-muc-chung/certificate-definition'),
        new AppMenuItem('Candidate skill', '', null, '/main/danh-muc-chung/candidate-skill'),
        new AppMenuItem('Candidate certificate', '', null, '/main/danh-muc-chung/candidate-certificate'),
        new AppMenuItem('Company', '', null, '/main/danh-muc-chung/company'),
        new AppMenuItem('Job position', '', null, '/main/danh-muc-chung/job-position'),
        new AppMenuItem('Job application', '', null, '/main/danh-muc-chung/job-application'),
        new AppMenuItem('Skill definition', '', null, '/main/danh-muc-chung/skill-definition'),
          
      ]),
      new AppMenuItem('Quản lý nghiệp vụ', '', null, '', [
        new AppMenuItem('CV', '', null, '/main/quan-ly-nghiep-vu/cv'),
        new AppMenuItem('Job posting', '', null, '/main/quan-ly-nghiep-vu/job-posting'),
      ]),
     
    ];
  }
}

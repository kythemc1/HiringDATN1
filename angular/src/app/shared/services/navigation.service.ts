import { Injectable } from '@angular/core';
import { AppMenuItem } from '../models';

@Injectable({ providedIn: 'root' })
export class NavigationService {

  constructor() { }

  getMenu(): AppMenuItem[] {
    const navigationRoles = {
      hr: ['hr'],
      candidate: ['candidate'],
      admin: ['admin'],
    };

    const createLeaf = (name: string, route: string, roles?: string[]) =>
      new AppMenuItem(name, '', null, route, undefined, undefined, undefined, undefined, undefined, roles);

    const createSection = (name: string, items: AppMenuItem[], roles?: string[]) =>
      new AppMenuItem(name, '', null, '', items, undefined, undefined, undefined, undefined, roles);

    return [
      createLeaf('Bảng thống kê', '/main/thong-ke'),

      createSection('Danh mục chung', [
        createLeaf('Agent thinking log', '/main/danh-muc-chung/agent-thinking-log', navigationRoles.admin),
        createLeaf('Ai model config', '/main/danh-muc-chung/ai-model-config', navigationRoles.admin),
        createLeaf('Ai prompt template', '/main/danh-muc-chung/ai-prompt-template', navigationRoles.admin),
        createLeaf('Candidate project', '/main/danh-muc-chung/candidate-project', navigationRoles.admin),
        createLeaf('Candidate profile', '/main/danh-muc-chung/candidate-profile', navigationRoles.admin),
        createLeaf('Candidate skill', '/main/danh-muc-chung/candidate-skill', navigationRoles.admin),
        createLeaf('Candidate certificate', '/main/danh-muc-chung/candidate-certificate', navigationRoles.admin),
      ]),

      createSection('Quản lý nghiệp vụ', [
        createLeaf('CV', '/main/quan-ly-nghiep-vu/cv', navigationRoles.candidate),
        createLeaf('Job posting', '/main/quan-ly-nghiep-vu/job-posting', navigationRoles.hr),
        createLeaf('Job apply', '/main/quan-ly-nghiep-vu/job-apply', navigationRoles.candidate),
        createLeaf('Job application', '/main/quan-ly-nghiep-vu/job-application', navigationRoles.hr),
      ]),

      createSection('Master data', [
        createLeaf('Company', '/main/master-data/company', navigationRoles.admin),
        createLeaf('Job position', '/main/master-data/job-position', navigationRoles.admin),
        createLeaf('Skill definition', '/main/master-data/skill-definition', navigationRoles.admin),
        createLeaf('Certificate definition', '/main/master-data/certificate-definition', navigationRoles.admin),
      ]),
    ];
  }
}

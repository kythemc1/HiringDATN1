import { Injectable } from '@angular/core';
import { AppMenuItem } from '../models';
import { ShareControllersService } from '../../proxy/controllers/share-controllers.service';
import { firstValueFrom } from 'rxjs';
const ROLE_MAP: Record<string, string> = {
  admin: 'admin',
  hr: 'hr',
  candidate: 'candidate',

  // nếu backend trả chữ hoa
  Admin: 'admin',
  HR: 'hr',
  Candidate: 'candidate',
};
@Injectable({ providedIn: 'root' })
export class NavigationService {

  constructor(private shareService: ShareControllersService) { }
  private cachedRoles: string[] | null = null;
  private rolesPromise: Promise<string[]> | null = null;

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
      ], navigationRoles.admin),

      createSection('Quản lý nghiệp vụ', [
        createLeaf('CV', '/main/quan-ly-nghiep-vu/cv', navigationRoles.candidate),
        createLeaf('Job posting', '/main/quan-ly-nghiep-vu/job-posting', navigationRoles.hr),
        createLeaf('Job apply', '/main/quan-ly-nghiep-vu/job-apply', navigationRoles.candidate),
        createLeaf('Job application', '/main/quan-ly-nghiep-vu/job-application', navigationRoles.hr),
      ], [...navigationRoles.hr, ...navigationRoles.candidate]),

      createSection('Master data', [
        createLeaf('Company', '/main/master-data/company', navigationRoles.admin),
        createLeaf('Job position', '/main/master-data/job-position', navigationRoles.admin),
        createLeaf('Skill definition', '/main/master-data/skill-definition', navigationRoles.admin),
        createLeaf('Certificate definition', '/main/master-data/certificate-definition', navigationRoles.admin),
      ], navigationRoles.admin),
    ];
  }
  
  async getListRoles(): Promise<string[]> {
    if (this.cachedRoles) {
      return this.cachedRoles;
    }
  
    if (this.rolesPromise) {
      return this.rolesPromise;
    }
  
    const requestPromise = firstValueFrom(this.shareService.getListRole())
      .then((roles) => {
        const mappedRoles =
          (roles ?? [])
            .map(r => ROLE_MAP[r])
            .filter(Boolean); // loại role không map được
  
        this.cachedRoles = mappedRoles;
        return mappedRoles;
      })
      .catch((error) => {
        console.error('[NavigationService] failed to load roles', error);
        this.cachedRoles = [];
        return [];
      })
      .finally(() => {
        this.rolesPromise = null;
      });
  
    this.rolesPromise = requestPromise;
    return requestPromise;
  }
  
}

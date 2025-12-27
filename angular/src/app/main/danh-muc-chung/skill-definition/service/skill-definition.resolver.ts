import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SkillDefinitionFacadeService } from './skill-definition.facade';
import { SkillDefinitionDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class SkillDefinitionResolver implements Resolve<SkillDefinitionDto | null> {
  constructor(private facade: SkillDefinitionFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SkillDefinitionDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/skill-definition?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

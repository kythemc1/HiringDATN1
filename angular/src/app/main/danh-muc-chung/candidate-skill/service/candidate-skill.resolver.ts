import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CandidateSkillFacadeService } from './candidate-skill.facade';
import { CandidateSkillDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class CandidateSkillResolver implements Resolve<CandidateSkillDto | null> {
  constructor(private facade: CandidateSkillFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CandidateSkillDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/candidate-skill?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

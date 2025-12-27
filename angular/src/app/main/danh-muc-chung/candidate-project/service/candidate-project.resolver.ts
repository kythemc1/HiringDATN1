import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CandidateProjectFacadeService } from './candidate-project.facade';
import { CandidateProjectDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class CandidateProjectResolver implements Resolve<CandidateProjectDto | null> {
  constructor(private facade: CandidateProjectFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CandidateProjectDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/candidate-project?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

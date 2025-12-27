import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CandidateEducationFacadeService } from './candidate-education.facade';
import { CandidateEducationDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class CandidateEducationResolver implements Resolve<CandidateEducationDto | null> {
  constructor(private facade: CandidateEducationFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CandidateEducationDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/candidate-education?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

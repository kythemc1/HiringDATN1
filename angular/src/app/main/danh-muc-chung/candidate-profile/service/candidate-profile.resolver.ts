import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CandidateProfileFacadeService } from './candidate-profile.facade';
import { CandidateProfileDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class CandidateProfileResolver implements Resolve<CandidateProfileDto | null> {
  constructor(private facade: CandidateProfileFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CandidateProfileDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/candidate-profile?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobPostingFacadeService } from './job-posting.facade';
import { JobPostingDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class JobPostingResolver implements Resolve<JobPostingDto | null> {
  constructor(private facade: JobPostingFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobPostingDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/job-posting?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

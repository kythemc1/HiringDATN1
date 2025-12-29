import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CVDto } from '../../../../proxy/dtos/models';
import { CvFacadeService } from './cv.facade';

@Injectable({ providedIn: 'root' })
export class CvResolver implements Resolve<CVDto | null> {
  constructor(private facade: CvFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CVDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/cv?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

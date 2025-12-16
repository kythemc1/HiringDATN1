import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AiModelConfigFacadeService } from './ai-model-config.facade';
import { AiModelConfigDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class AiModelConfigResolver implements Resolve<AiModelConfigDto | null> {
  constructor(private facade: AiModelConfigFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AiModelConfigDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/ai-model-config?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

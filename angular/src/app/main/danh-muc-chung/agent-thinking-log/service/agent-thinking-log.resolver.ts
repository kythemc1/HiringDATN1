import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AgentThinkingLogFacadeService } from './agent-thinking-log.facade';
import { AgentThinkingLogDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class AgentThinkingLogResolver implements Resolve<AgentThinkingLogDto | null> {
  constructor(private facade: AgentThinkingLogFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AgentThinkingLogDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/agent-thinking-log?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

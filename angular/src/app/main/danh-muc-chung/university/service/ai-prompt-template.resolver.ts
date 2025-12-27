import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AiPromptTemplateFacadeService } from './ai-prompt-template.facade';
import { AiPromptTemplateDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class AiPromptTemplateResolver implements Resolve<AiPromptTemplateDto | null> {
  constructor(private facade: AiPromptTemplateFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AiPromptTemplateDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/ai-prompt-template?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AiPromptTemplateService } from '../../../../proxy/controllers/ai-prompt-template.service';
import { AiPromptTemplateRowView, mapAiPromptTemplateResponse } from '../interface/ai-prompt-template';
import { AiPromptTemplateDto, SearchInputDto } from '../../../../proxy/dtos/models';

export interface LoadPageParams {
  searchKeyword?: string;
  terms: SearchInputDto;
  pageIndex: number;
  rows: number;
}

export interface LoadPageResult {
  data: AiPromptTemplateRowView[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class AiPromptTemplateFacadeService {
  constructor(private api: AiPromptTemplateService) {}

  loadPage(params: LoadPageParams): Observable<LoadPageResult> {
    const rows = params.rows || 10;
    const req: any = {
      keyword: (params.searchKeyword ?? params.terms?.keyword ?? '').toString().trim(),
      skipCount: (params.pageIndex ?? 0) * rows,
      maxResultCount: rows,
    };

  // Call generated proxy 'search' endpoint for paged results
  return this.api.search(req).pipe(
      map(res => {
        const { data, total } = mapAiPromptTemplateResponse(res);
        return { data, total } as LoadPageResult;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return this.api.delete(id);
  }
  
  getDetailById(id: number): Observable<AiPromptTemplateDto> {
    return this.api.getById(id) as Observable<AiPromptTemplateDto>;
  }


}

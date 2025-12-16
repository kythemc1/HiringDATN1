import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AiModelConfigService } from '../../../../proxy/controllers/ai-model-config.service';
import { AIModelConfigRowView, mapAIModelConfigResponse } from '../interface/ai-model-config';
import { AiModelConfigDto, SearchInputDto } from '../../../../proxy/dtos/models';

export interface LoadPageParams {
  searchKeyword?: string;
  terms: SearchInputDto;
  pageIndex: number;
  rows: number;
}

export interface LoadPageResult {
  data: AIModelConfigRowView[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class AiModelConfigFacadeService {
  constructor(private api: AiModelConfigService) {}

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
        const { data, total } = mapAIModelConfigResponse(res);
        return { data, total } as LoadPageResult;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return this.api.delete(id);
  }
  
  getDetailById(id: number): Observable<AiModelConfigDto> {
    return this.api.getById(id) as Observable<AiModelConfigDto>;
  }


}

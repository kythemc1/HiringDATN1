import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AgentThinkingLogService } from '../../../../proxy/controllers/agent-thinking-log.service';
import { CvRowView, mapCvResponse } from '../interface/cv';
import { AgentThinkingLogDto, CVDto, SearchInputDto } from '../../../../proxy/dtos/models';
import { CVService } from 'src/app/proxy/controllers/cv.service';

export interface LoadPageParams {
  searchKeyword?: string;
  terms: SearchInputDto;
  pageIndex: number;
  rows: number;
}

export interface LoadPageResult {
  items: CvRowView[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class CvFacadeService {
  constructor(private api: CVService) {}

  loadPage(params: LoadPageParams): Observable<LoadPageResult> {
    const rows = params.rows || 10;
    const req: any = {
      keyword: (params.searchKeyword ?? params.terms?.keyword ?? '').toString().trim(),
      skipCount: (params.pageIndex ?? 0) * rows,
      maxResultCount: rows,
    };
 
  // Call generated proxy 'search' endpoint for paged results
  return this.api.getList(req).pipe(
      map(res => {
        const { items, totalCount } = mapCvResponse(res);
        return { items, totalCount } as LoadPageResult;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return this.api.delete(id);
  }
  
  getDetailById(id: number): Observable<CVDto> {
    return this.api.get(id) as Observable<CVDto>;
  }


}

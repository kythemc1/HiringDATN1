import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { JobPositionService } from '../../../../proxy/controllers/job-position.service';
import { JobPositionRowView, mapJobPositionResponse } from '../interface/job-position';
import { JobPositionDto, SearchInputDto } from '../../../../proxy/dtos/models';

export interface LoadPageParams {
  searchKeyword?: string;
  terms: SearchInputDto;
  pageIndex: number;
  rows: number;
}

export interface LoadPageResult {
  data: JobPositionRowView[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class JobPositionFacadeService {
  constructor(private api: JobPositionService) {}

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
        const { data, total } = mapJobPositionResponse(res);
        return { data, total } as LoadPageResult;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return this.api.delete(id);
  }
  
  getDetailById(id: number): Observable<JobPositionDto> {
    return this.api.getById(id) as Observable<JobPositionDto>;
  }


}

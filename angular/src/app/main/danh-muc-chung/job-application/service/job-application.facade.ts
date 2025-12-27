import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { JobApplicationService } from '../../../../proxy/controllers/job-application.service';
import { JobApplicationRowView, mapJobApplicationResponse } from '../interface/job-application';
import { JobApplicationDto, SearchInputDto } from '../../../../proxy/dtos/models';

export interface LoadPageParams {
  searchKeyword?: string;
  terms: SearchInputDto;
  pageIndex: number;
  rows: number;
}

export interface LoadPageResult {
  data: JobApplicationRowView[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class JobApplicationFacadeService {
  constructor(private api: JobApplicationService) {}

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
        const { data, total } = mapJobApplicationResponse(res);
        return { data, total } as LoadPageResult;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return this.api.delete(id);
  }
  
  getDetailById(id: number): Observable<JobApplicationDto> {
    return this.api.getById(id) as Observable<JobApplicationDto>;
  }


}

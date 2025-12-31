import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { JobPostionRecruitmentService } from '../../../../proxy/controllers/job-postion-recruitment.service';
import { JobPostingRowView, mapJobPostingResponse } from '../interface/job-posting';
import { JobPostingDto, SearchInputDto } from '../../../../proxy/dtos/models';

export interface LoadPageParams {
  searchKeyword?: string;
  terms: SearchInputDto;
  pageIndex: number;
  rows: number;
}

export interface LoadPageResult {
  data: JobPostingRowView[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class JobPostingFacadeService {
  constructor(private api: JobPostionRecruitmentService) {}

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
        const { data, total } = mapJobPostingResponse(res);
        return { data, total } as LoadPageResult;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return this.api.delete(id);
  }
  
  getDetailById(id: number): Observable<JobPostingDto> {
    return this.api.getById(id) as Observable<JobPostingDto>;
  }


}

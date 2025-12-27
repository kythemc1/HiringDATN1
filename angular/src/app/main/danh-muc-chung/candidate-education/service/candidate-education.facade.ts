import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CandidateEducationService } from '../../../../proxy/controllers/candidate-education.service';
import { CandidateEducationRowView, mapCandidateEducationResponse } from '../interface/candidate-education';
import { CandidateEducationDto, SearchInputDto } from '../../../../proxy/dtos/models';

export interface LoadPageParams {
  searchKeyword?: string;
  terms: SearchInputDto;
  pageIndex: number;
  rows: number;
}

export interface LoadPageResult {
  data: CandidateEducationRowView[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class CandidateEducationFacadeService {
  constructor(private api: CandidateEducationService) {}

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
        const { data, total } = mapCandidateEducationResponse(res);
        return { data, total } as LoadPageResult;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return this.api.delete(id);
  }
  
  getDetailById(id: number): Observable<CandidateEducationDto> {
    return this.api.getById(id) as Observable<CandidateEducationDto>;
  }


}

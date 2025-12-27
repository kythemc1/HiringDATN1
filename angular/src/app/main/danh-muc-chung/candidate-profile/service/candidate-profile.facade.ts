import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CandidateProfileService } from '../../../../proxy/controllers/candidate-profile.service';
import { CandidateProfileRowView, mapCandidateProfileResponse } from '../interface/candidate-profile';
import { CandidateProfileDto, SearchInputDto } from '../../../../proxy/dtos/models';

export interface LoadPageParams {
  searchKeyword?: string;
  terms: SearchInputDto;
  pageIndex: number;
  rows: number;
}

export interface LoadPageResult {
  data: CandidateProfileRowView[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class CandidateProfileFacadeService {
  constructor(private api: CandidateProfileService) {}

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
        const { data, total } = mapCandidateProfileResponse(res);
        return { data, total } as LoadPageResult;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return this.api.delete(id);
  }
  
  getDetailById(id: number): Observable<CandidateProfileDto> {
    return this.api.getById(id) as Observable<CandidateProfileDto>;
  }


}

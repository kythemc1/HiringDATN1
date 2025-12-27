import { Injectable } from "@angular/core";
import { CandidateProfileService } from "../../../../proxy/controllers/candidate-profile.service";
import { CandidateProfileDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CandidateProfileApiService {
    constructor(
     
        private CandidateProfileService: CandidateProfileService,
    ) { }

    getCandidateProfile(input: SearchInputDto): Observable<any> {
        return this.CandidateProfileService.search(input);
    }

    deleteCandidateProfile(id: number): Observable<any> {
        return this.CandidateProfileService.delete(id);
    }

    getDetailById(id: number): Observable<CandidateProfileDto> {
        return this.CandidateProfileService.getById(id).pipe(
            map((res: any) => res?.CandidateProfile as CandidateProfileDto)
        );
    }

}

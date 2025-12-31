import { Injectable } from "@angular/core";
import { JobPostionRecruitmentService } from "../../../../proxy/controllers/job-postion-recruitment.service";
import { JobPostingDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class JobPostingApiService {
    constructor(
     
        private jobPostionRecruitmentService: JobPostionRecruitmentService,
    ) { }

    getJobPosting(input: SearchInputDto): Observable<any> {
        return this.jobPostionRecruitmentService.search(input);
    }

    deleteJobPosting(id: number): Observable<any> {
        return this.jobPostionRecruitmentService.delete(id);
    }

    getDetailById(id: number): Observable<JobPostingDto> {
        return this.jobPostionRecruitmentService.getById(id).pipe(
            map((res: any) => res?.jobPostionRecruitment as JobPostingDto)
        );
    }

}

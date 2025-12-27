import { Injectable } from "@angular/core";
import { JobApplicationService } from "../../../../proxy/controllers/job-application.service";
import { JobApplicationDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class JobApplicationApiService {
    constructor(
     
        private JobApplicationService: JobApplicationService,
    ) { }

    getJobApplication(input: SearchInputDto): Observable<any> {
        return this.JobApplicationService.search(input);
    }

    deleteJobApplication(id: number): Observable<any> {
        return this.JobApplicationService.delete(id);
    }

    getDetailById(id: number): Observable<JobApplicationDto> {
        return this.JobApplicationService.getById(id).pipe(
            map((res: any) => res?.JobApplication as JobApplicationDto)
        );
    }

}

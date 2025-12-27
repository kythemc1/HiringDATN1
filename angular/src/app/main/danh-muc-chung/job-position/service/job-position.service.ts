import { Injectable } from "@angular/core";
import { JobPositionService } from "../../../../proxy/controllers/job-position.service";
import { JobPositionDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class JobPositionApiService {
    constructor(
     
        private JobPositionService: JobPositionService,
    ) { }

    getJobPosition(input: SearchInputDto): Observable<any> {
        return this.JobPositionService.search(input);
    }

    deleteJobPosition(id: number): Observable<any> {
        return this.JobPositionService.delete(id);
    }

    getDetailById(id: number): Observable<JobPositionDto> {
        return this.JobPositionService.getById(id).pipe(
            map((res: any) => res?.JobPosition as JobPositionDto)
        );
    }

}

import { Injectable } from "@angular/core";
import { CVDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";
import { CVService } from "src/app/proxy/controllers/cv.service";

@Injectable({ providedIn: 'root' })

export class CvApiService {
    constructor(
     
        private CvService: CVService,
    ) { }

    getCv(input: SearchInputDto): Observable<any> {
        return this.CvService.getList(input);
    }

    deleteCv(id: number): Observable<any> {
        return this.CvService.delete(id);
    }

    getDetailById(id: number): Observable<CVDto> {
        return this.CvService.get(id).pipe(
            map((res: any) => res?.CVDto as CVDto)
        );
    }

}

import { Injectable } from "@angular/core";
import { CandidateCertificateService } from "../../../../proxy/controllers/candidate-certificate.service";
import { CandidateCertificateDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CandidateCertificateApiService {
    constructor(
     
        private CandidateCertificateService: CandidateCertificateService,
    ) { }

    getCandidateCertificate(input: SearchInputDto): Observable<any> {
        return this.CandidateCertificateService.search(input);
    }

    deleteCandidateCertificate(id: number): Observable<any> {
        return this.CandidateCertificateService.delete(id);
    }

    getDetailById(id: number): Observable<CandidateCertificateDto> {
        return this.CandidateCertificateService.getById(id).pipe(
            map((res: any) => res?.CandidateCertificate as CandidateCertificateDto)
        );
    }

}

import { Injectable } from "@angular/core";
import { CertificateDefinitionService } from "../../../../proxy/controllers/certificate-definition.service";
import { CertificateDefinitionDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CertificateDefinitionApiService {
    constructor(
     
        private CertificateDefinitionService: CertificateDefinitionService,
    ) { }

    getCertificateDefinition(input: SearchInputDto): Observable<any> {
        return this.CertificateDefinitionService.search(input);
    }

    deleteCertificateDefinition(id: number): Observable<any> {
        return this.CertificateDefinitionService.delete(id);
    }

    getDetailById(id: number): Observable<CertificateDefinitionDto> {
        return this.CertificateDefinitionService.getById(id).pipe(
            map((res: any) => res?.CertificateDefinition as CertificateDefinitionDto)
        );
    }

}

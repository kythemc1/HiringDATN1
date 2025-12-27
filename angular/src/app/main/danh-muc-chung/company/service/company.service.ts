import { Injectable } from "@angular/core";
import { CompanyService } from "../../../../proxy/controllers/company.service";
import { CompanyDto, SearchInputDto } from "../../../../proxy/dtos/models";

import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CompanyApiService {
    constructor(
     
        private CompanyService: CompanyService,
    ) { }

    getCompany(input: SearchInputDto): Observable<any> {
        return this.CompanyService.search(input);
    }

    deleteCompany(id: number): Observable<any> {
        return this.CompanyService.delete(id);
    }

    getDetailById(id: number): Observable<CompanyDto> {
        return this.CompanyService.getById(id).pipe(
            map((res: any) => res?.Company as CompanyDto)
        );
    }

}

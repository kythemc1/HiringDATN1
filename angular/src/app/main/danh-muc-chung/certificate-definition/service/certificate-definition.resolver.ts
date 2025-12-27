import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CertificateDefinitionFacadeService } from './certificate-definition.facade';
import { CertificateDefinitionDto } from '../../../../proxy/dtos/models';

@Injectable({ providedIn: 'root' })
export class CertificateDefinitionResolver implements Resolve<CertificateDefinitionDto | null> {
  constructor(private facade: CertificateDefinitionFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CertificateDefinitionDto | null> {
    const idParam = route.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!id || isNaN(id)) {
      return of(null);
    }
    // For edit route we intentionally call getById (non-detail) which maps to '/api/danh-muc/certificate-definition?id='
    return this.facade.getDetailById(id).pipe(
      catchError(() => of(null))  
    );
  }
}

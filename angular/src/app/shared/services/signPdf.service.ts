import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class SignPdfService {
  private apiUrl = "/sign-api/";

  constructor(private http: HttpClient) {}

  signPdf(data2Send: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post<any>(this.apiUrl + "signPDF", data2Send, { headers });
  }

  signmultiPDFv2(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.post<any>(this.apiUrl + "signmultiPDFv2", payload, { headers });
  }
}

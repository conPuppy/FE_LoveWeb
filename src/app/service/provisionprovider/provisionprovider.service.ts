import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProvisionProvider} from "../../model/ProvisionProvider";

@Injectable({
    providedIn: 'root'
})
export class ProvisionProviderService {
    provisionproviders: ProvisionProvider[] = []

    constructor(private http: HttpClient) {
    }

    getAllProvisionProvider(): Observable<ProvisionProvider[]> {
        return this.http.get<ProvisionProvider[]>("http://localhost:8080/provisionproviders");
    }

    findProvisionProviderByProviderId(providerId: number): Observable<ProvisionProvider[]> {
        return this.http.get<ProvisionProvider[]>(`http://localhost:8080/provisionproviders/a/getStatus/${providerId}`)
    }

    findById(id: number): Observable<ProvisionProvider> {
        return this.http.get<ProvisionProvider>(`http://localhost:8080/provisionproviders/a/${id}`)
    }

    saveProvisionProvider(provisionProvider: ProvisionProvider): Observable<ProvisionProvider> {
        return this.http.post<ProvisionProvider>('http://localhost:8080/provisionproviders', provisionProvider)
    }

    findProvisionProviderByProviderIdStatus1(providerId: number): Observable<ProvisionProvider[]> {
        return this.http.get<ProvisionProvider[]>(`http://localhost:8080/provisionproviders/a/getStatus1/${providerId}`)
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Provider} from "../../model/Provider";
import { OrderLover } from 'src/app/model/OrderLover';
import { CreateProvider } from 'src/app/model/CreateProvider';


@Injectable({
    providedIn: 'root'
})
export class ProviderService {
    providers: Provider[] = []
    private url = "http://localhost:8080/providers";

    constructor(private http: HttpClient) {
    }
    getNewProviders(): Observable<Provider[]> {
        return this.http.get<Provider[]>(this.url+"/newProviders");
    }

    getProviderTopSell(): Observable<Provider[]> {
        return this.http.get<Provider[]>(this.url + "/top/sell/provider");
    }

    getProviderTopSellandLuotThue(): Observable<any> {
        return this.http.get<any>(this.url+"/top/sell/provider/luotthue");
    }

    getProviderTopView(): Observable<Provider[]> {
        return this.http.get<Provider[]>(this.url + "/top/view");
    }

    getBoyProviderTopView(): Observable<Provider[]> {
        return this.http.get<Provider[]>(this.url + "/top/view/boy");
    }

    getGirlProviderTopView(): Observable<Provider[]> {
        return this.http.get<Provider[]>(this.url + "/top/view/girl");
    }

    findProviderById(id: number): Observable<Provider> {
        return this.http.get<Provider>(this.url + "/viewer/" + id);
    }

    increaseViewProviderById(id: number): Observable<Provider> {
        return this.http.post<Provider>(this.url + "/viewer/" + id, this.findProviderById(id));
    }

    getAllProviderAcc(page: number): Observable<Provider[]> {
        return this.http.get<Provider[]>(this.url + "?page" + page);
    }
    getAllProvider(page:number):Observable<Provider[]>{
        return this.http.get<Provider[]>(this.url+"/t/gatAllProviders"+ "?page" + page)
    }
    getBillByIdProvider(idProvider: number): Observable<OrderLover[]> {
        return this.http.get<OrderLover[]>(this.url + "/orders/" + idProvider);
    }

    findProviderByAccountUsername(accountUsername: string): Observable<Provider> {
        return this.http.get<Provider>(this.url + "/" + accountUsername);
    }

    findProviderByAccount_Id(accountId: number): Observable<Provider> {
        return this.http.get<Provider>(this.url + `/a/getProviderByAccountId/${accountId}` );
    }
    createProvider(provider:CreateProvider):Observable<CreateProvider>{
        return this.http.post<CreateProvider>(this.url + "/a/createProviderAndService",provider);
    }
    acceptProvider(provider:Provider):Observable<Provider>{
        return this.http.post<Provider>(this.url + "/a/acceptProvider/sendEmail",provider);
    }

    getAllBillOfProviderAndStartOrder(idProvider: number, statusOrder: number): Observable<OrderLover[]> {
        return this.http.get<OrderLover[]>(this.url + `/user/getOrdersByStatus/${idProvider}/${statusOrder}`)
    }
    editProvider(provider:Provider):Observable<Provider>{
        return this.http.post<Provider>(this.url + "/a/createProviderAndService",provider);
    }

}

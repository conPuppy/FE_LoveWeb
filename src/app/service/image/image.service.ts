import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image1 } from 'src/app/model/Image1';
import { ImageUrlDTO } from 'src/app/model/ImageUrlDTO/ImageUrlDTO';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }
  saveImage(image: Image1): Observable<Image1> {
    return this.http.post<Image1>('http://localhost:8080/image', image)
  }
  findByAccount_IdAAndStatusImg1(accountId:number):Observable<ImageUrlDTO[]>{
    return this.http.get<ImageUrlDTO[]>(`http://localhost:8080/image/a/1/${accountId}`)
  }
}

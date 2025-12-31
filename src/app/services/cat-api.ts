import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

export interface Breed {
  id: string;
  name: string;
  description?: string;
  origin?: string;
  temperament?: string;
  life_span?: string;
  weight?: {
    imperial: string;
    metric: string;
  };
  image?: {
    id: string;
    url: string;
    width?: number;
    height?: number;
  };
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class CatApi {
  private apiUrl = environment.catApi.url;
  private apiKey = environment.catApi.key;
  private breedsCache: Breed[] | null = null;

  constructor(private http: HttpClient) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ 'x-api-key': this.apiKey });
  }

  getBreeds(): Observable<Breed[]> {
    if (this.breedsCache) {
      return of(this.breedsCache);
    }
    
    return this.http.get<Breed[]>(`${this.apiUrl}/breeds`, { headers: this.headers }).pipe(
      tap(breeds => {
        this.breedsCache = breeds;
      })
    );
  }

  getImagesByBreed(breedId: string, limit: number = 10): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(
      `${this.apiUrl}/images/search?limit=${limit}&breed_ids=${breedId}`,
      { headers: this.headers }
    );
  }
}

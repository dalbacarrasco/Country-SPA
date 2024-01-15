import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private url: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryByCode(term: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.url}/alpha/${term}`).pipe(
      map( (countries => countries.length > 0 ? countries[0] : null) ),
      catchError( err => of(null) ) );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/capital/${term}`).pipe( catchError( err => of([]) ) );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/name/${term}`).pipe( catchError( err => of([]) ) );
  }

  searchRegion(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/region/${term}`).pipe( catchError( err => of([]) ) );
  }

}

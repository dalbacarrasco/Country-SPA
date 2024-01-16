import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, count, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { cacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private url: string = 'https://restcountries.com/v3.1';
  public cacheStore: cacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountries: {
      term: '',
      countries: []
    },
    byRegion: {
      region: '',
      countries: []
    }
  };

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError(err => of([])));
  }

  searchCountryByCode(term: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.url}/alpha/${term}`).pipe(
      map((countries => countries.length > 0 ? countries[0] : null)),
      catchError(err => of(null)));
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/capital/${term}`)
    .pipe(tap( countries => this.cacheStore.byCapital = { term, countries }));
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/name/${term}`)
    .pipe(tap( countries => this.cacheStore.byCountries = { term, countries }));
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.url}/region/${region}`)
    .pipe(tap( countries => this.cacheStore.byRegion = { region, countries }));;
  }

}

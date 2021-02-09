import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://radiant-journey-16913.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {

  constructor(private http: HttpClient) {
  } 

  //api call for user registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.' 
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class UserLoginService {
  constructor(private http: HttpClient){
  }

  //api call for login 
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  } 

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class GetAllMoviesService {
  constructor(private http: HttpClient){
  }

  //api call to get movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status Code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class GetOneMovieService {
  constructor(private http: HttpClient){
  }

  //api call to get a single movie
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class GetDirectorService {
  constructor(private http: HttpClient) {
  }

  //api call to get director info
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/Directors/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + 
        `Error body is ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class GetGenreService {
  constructor(private http: HttpClient) {
  }

  //api call to get genre info
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/Genre/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class GetUserService {
  constructor(private http: HttpClient) {
  }

  //api call to get user
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class GetFavouriteMoviesService{
  constructor(private http: HttpClient) {
  }

  //api call to get the user's favourite movies
  getFavouriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:username/movies/:movieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class AddFavouriteMovieService {
  constructor(private http: HttpClient) {
  }

  //api call to add a favourite movie
  addFavouriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/:username/movies/:movieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class EditUserService {
  constructor(private http: HttpClient) {
  }

  //api call to edit user info
  editUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/:username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class DeleteUserService {
  constructor(private http: HttpClient) {
  }

  //api call to delete user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/:username', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class DeleteFavouriteMovieService {
  constructor(private http: HttpClient) {
  }

  //api call to delete favourite movie
  deleteFavouriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/:username/movies/:movieID', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class FetchApiDataService {

  constructor() { }
}
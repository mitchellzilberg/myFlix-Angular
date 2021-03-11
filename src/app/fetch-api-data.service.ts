import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @param apiUrl url to backend of App
 */

// const apiUrl = 'http://localhost:8080/';
// @Injectable({
//   providedIn: 'root'
// })

const apiUrl = 'https://radiant-journey-16913.herokuapp.com/';

/**
 * function to register user
 * and make api call
 */

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  //Inject the HttpClient module to the constructor params
  //This will provide the HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  } 

  //making the api call for the user registration endpoint
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

/**
 * API call for log in
 * @param userDetails Login/Password
 */

@Injectable({
  providedIn: 'root'
})

export class UserLoginService {
  constructor(private http: HttpClient){
  }

  //making the api call to the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  } 

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`, error.error
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

/**
 * API to get All Movies
 */

@Injectable({
  providedIn: 'root'
})

export class GetAllMoviesService {
  constructor(private http: HttpClient) { }
  // Making API to get All Movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );    
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
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

/**
 * API call to get one Movie
 */

@Injectable({
  providedIn: 'root'
})

export class GetOneMovieService {
  constructor(private http: HttpClient) {}

  //api call to get single movie data
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), 
      catchError(this.handleError));
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
 * API call to get director by name
 */

@Injectable({
  providedIn: 'root'
})

export class GetDirectorService {
  constructor(private http: HttpClient) {}

  //api call to get director data by name
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/Directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later');
  }
}

/**
 * API call to get genre by name/title
 */

@Injectable({
  providedIn: 'root'
})

export class GetGenreService {
  constructor(private http: HttpClient) {}

  //api call to get genre by movie title
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/Genre/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later');
  }
}

/**
 * API callto get user by username
 */

@Injectable({
  providedIn: 'root'
})

export class GetUserService {
  constructor(private http: HttpClient) {}

  //api call to get user data by Username
  getUser(username: string): Observable<any> { //username: string
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), 
      catchError(this.handleError));
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
 * API call to get All Movies
 * from favourites list of the user
 */

@Injectable({
  providedIn: 'root'
})

export class GetFavouriteMoviesService{
  constructor(private http: HttpClient) {
  }

  //making api call to get the user's favourite movies
  public getFavouriteMovies(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + 'users/:username/movies/:movieID') //userDetails
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Object): any {
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

/**
 * API call to add movie to favorite list
 */

@Injectable({
  providedIn: 'root'
})

export class AddFavouriteMovieService {
  constructor(private http: HttpClient) {}

  //api call to add a favourite movie
  addFavouriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log(username);
    console.log(token);
    console.log(id);
    return this.http
      // .post(apiUrl + 'users/:username/movies/:id', id, {
      .post(`${apiUrl}users/${username}/movies/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
 * API call to delete movie
 * from the list of favourites
 */

@Injectable({
  providedIn: 'root'
})

export class DeleteFavouriteMovieService {
  constructor(private http: HttpClient) {}

  //api call to delete a favourite movie
  deleteFavouriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
 * API callto update user's info
 */

@Injectable({
  providedIn: 'root'
})

export class EditUserService {
  constructor(private http: HttpClient) {}

  //api call to edit the user's information
  editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    return this.http
      .put(`${apiUrl}users/${id}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/**
 * API call to delete user
 */

@Injectable({
  providedIn: 'root'
})

export class DeleteUserService {
  constructor(private http: HttpClient) {}

  //api call to delete user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/:username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}


// @Injectable({
//   providedIn: 'root'
// })


// export class FetchApiDataService {

//   constructor() { }
// }
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  GetUserService,
  EditUserService,
  GetFavouriteMoviesService,
  DeleteFavouriteMovieService,
  GetAllMoviesService,
  DeleteUserService,
} from '../fetch-api-data.service';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit { //implements OnInit
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  movies: any[] = [];
  favouriteMovies: any[] = [];
  favouriteMovieIDs: any[] = [];

  constructor(
    public fetchApiData: EditUserService,
    public fetchApiDataAllMovies: GetAllMoviesService,
    public fetchApiDataUser: GetUserService,
    public fetchApiDataFavouriteMovies: GetFavouriteMoviesService,
    public fetchApiDataDeleteMovie: DeleteFavouriteMovieService,
    public fetchApiDataDeleteUser: DeleteUserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFavouriteMovies();
  }

  /**
   * Function to get list of Favourite movies
   */

  getFavouriteMovies(): void {
    const user = localStorage.getItem('user') || '';
    console.log(user);

    this.fetchApiDataUser.getUser(user).subscribe((resp: any) => {
      this.favouriteMovieIDs = resp.favouriteMovies;

      return this.favouriteMovieIDs;
    });
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  /**
   * Functoin to get list of movies
   */

  getMovies(): void {
    this.fetchApiDataAllMovies.getAllMovies().subscribe((resp: any) => {
      // console.log(resp);
      this.movies = resp;

      console.log(this.movies);
      this.movies.forEach((movie) => {
        if (this.favouriteMovieIDs.includes(movie.id))
          this.favouriteMovies.push(movie);
      });
      console.log(this.favouriteMovies);
      return this.favouriteMovies;
    });
  }

  /**
   * Function to delete user 
   * @param id user id
   */

  deleteFavouriteMovie(id: string, title: string): void {
    this.fetchApiDataDeleteMovie
      .deleteFavouriteMovie(id)
      .subscribe((resp: any) => {
        console.log(resp);
        window.location.reload();
      });
  }

 /**
   * Function to Edit users info
   * @param this.userData data requested from database
   */

  editUserData(form: NgForm): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        console.log(result);
        form.resetForm();
        this.snackBar.open('Your profile was successfully updated!', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      (result) => {
        console.log(result);
        // form.resetForm();
        this.snackBar.open(result, 'OK', {
          duration: 5000,
        });
      }
    );
  }

  /**
 * Function to open movies Dialog
 * @param Description Movie's description
 * @param Image Image of the movie
 * @param Title Movie's title
 */

  openSynopsisDialog(synopsis: string, image: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis, image },
      width: '600px',
      height: '530px',
    });
  }

  /**
   * function to open genre dialog
   * @param Name Gener Name/Title
   * @param Description Gener deescription
   */

  openGenreDialog(name: string, description: string, image: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description, image},
      width: '580px',
      height: '480px',
    });
  }

  /**
     * function to open directors dialog
     * @param Name Directot's Name
     * @param Bio Director's Bio
     * @param Birth Director'd Birthday
     * @param Death Director's death if apply
     */

  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string,
    image: string
  ): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth, death, image },
      width: '600px',
      height: '620px',
    });
  }
}

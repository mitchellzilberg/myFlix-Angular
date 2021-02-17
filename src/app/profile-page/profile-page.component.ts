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

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit { //implements OnInit
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

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

  getFavouriteMovies(): void {
    const user = localStorage.getItem('user');
    console.log(user);

    this.fetchApiDataUser.getUser().subscribe((resp: any) => {
      this.favouriteMovieIDs = resp.FavouriteMovies;
      // console.log(resp);
      // console.log(this.favouriteMovieIDs);
      // if (this.favouriteMovieIDs.length === 0) {
      //   let noFavourites = document.querySelector('.no_favorites');
      //   noFavourites.innerHTML = `<h3>You haven't chosen any favourite movies yet!</h3>`;
      // }

      return this.favouriteMovieIDs;
    });
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  getMovies(): void {
    this.fetchApiDataAllMovies.getAllMovies().subscribe((resp: any) => {
      // console.log(resp);
      this.movies = resp;

      console.log(this.movies);
      this.movies.forEach((movie) => {
        if (this.favouriteMovieIDs.includes(movie._id))
          this.favouriteMovies.push(movie);
      });
      console.log(this.favouriteMovies);
      return this.favouriteMovies;
    });
  }

  deleteFavouriteMovie(id: string, title: string, i: number): void {
    this.fetchApiDataDeleteMovie
      .deleteFavouriteMovie(id)
      .subscribe((resp: any) => {
        let cards = document.querySelectorAll('.card');
        let tempCards = Array.from(cards);
        tempCards[i].classList.remove('active');
        tempCards[i].classList.add('delete');
        // this.checkNoFavourites();
      });
  }

  // checkNoFavourites() {
  //   let container = document.querySelector('.movie_container');
  //   let noFavourites = document.querySelector('.no_favourites');
  //   if (container.querySelectorAll('.active').length < 1)
  //     noFavourites.innerHTML = `<h3>You haven't chosen any favourite movies yet!</h3>`;
  // }

  editUserData(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        console.log(result);
        this.snackBar.open('Your profile was successfully updated!', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 5000,
        });
      }
    );
  }

  openSynopsisDialog(synopsis: string, image: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis, image },
      width: '600px',
      height: '530px',
    });
  }

  openGenreDialog(name: string, description: string, image: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description, image},
      width: '580px',
      height: '480px',
    });
  }

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

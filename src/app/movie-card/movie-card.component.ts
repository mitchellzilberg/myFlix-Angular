import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { 
  // FetchApiDataService,
  GetAllMoviesService,
  AddFavouriteMovieService,  
} from '../fetch-api-data.service';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  
  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: AddFavouriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * get all movie function
   * @returns list of all movies from Data Base
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
  }

  /**
   *
   * @param id the ID of movie to add
   * @param Title the Title of movie
   */

  addToFavourites(id: string, title: string) {
    this.fetchApiData2.addFavouriteMovie(id).subscribe((resp: any) => { 
      console.log(resp);
      this.snackBar.open(
        `"${title}" added to your Favourite Movies List`,
        'OK',
        {
          duration: 1500,
          verticalPosition: 'top',
        }
      );
    });
  }

  /**
   *
   * @param Description sescription of movie
   * @param Image Image of the movie
   * @param Title Title of the movie
   */

  openSynopsisDialog(synopsis: string, image: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis, image },
      width: '600px',
      height: '530px',
    });
  }

   /**
   *
   * @param Name Name/Title of Genre
   * @param Description Description of genre
   */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description},
      width: '580px',
      height: '480px',
    });
  }

  /**
   *
   * @param Name Directors Name
   * @param Bio Directore Bio
   * @param Birth Directors birthday
   * @param Death Directorth Death day if apply
   */

  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string,
  ): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth, death },
      width: '600px',
      height: '620px',
    });
  }


}
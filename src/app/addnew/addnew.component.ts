import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  movie: string = "";
  buf: string = "";
  year: string = "";
  msg: string = "";
  trailer: string = "";
  dlink: string = "";
  names = [];
  extra:any;
  poster: string = "q";
  result: string = "";
  language: string="";
  ratings: string="";
  genre: string="";
  runtime: string="";
  actors: string="";
  plot: string="";
  movieid: any;

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  ngOnInit() {
  }

  async getmovie() {
    if (this.movie == null) {
      this.buf = "Movie name can't be empty"
    }
    else {
      this.buf = "";
       try {
        await fetch('https://www.omdbapi.com/?apikey=762a3982&s=' + this.movie + '&y=' + this.year)
        .then(response => response.json())
        .then(res => this.names = res.Search)
        console.log(this.names[0]["imdbID"]);



      //  this.extra= await this.http.get("http://www.omdbapi.com/?i="+this.names["imdbID"]&plot=full&apikey=762a3982").toPromise();
        //console.log(this.extra);
        //console.log(this.extra["Title"]);
      }
          catch(error){
            console.log("Error",error);
          }
      // await fetch('https://www.omdbapi.com/?apikey=762a3982&s=' + this.movie + '&y=' + this.year)
      //   .then(response => response.json()).then(res => this.names = res.Search)
      console.log(this.names);
      console.log(this.names);
      if (this.names.length < 1) {
        this.msg = "No Movies Found with this Name " + this.movie;
        console.log("No movie found");
      }
      else {
        console.log("yes");
      }
    }
  }

async capture(item:string){
    console.log(item["Poster"]);
    this.poster=item["Poster"];
    this.extra= await this.http.get("https://www.omdbapi.com/?i="+item["imdbID"]+"&plot=full&apikey=762a3982").toPromise();
    this.ratings=this.extra["imdbRating"];
    console.log(this.extra["imdbRating"]);
    this.genre=this.extra["Genre"];
    console.log(this.extra["Genre"]);
    this.runtime=this.extra["Runtime"];
    console.log(item["Runtime"]);
    this.actors=this.extra["Actors"];
    console.log(item["Actors"]);
    this.plot=this.extra["Plot"];
    console.log(item["Plot"]);

  }

  validate() {
    if (this.movie.length > 0 && this.year.length > 0 && this.dlink.length > 0 && this.trailer.length > 0 && this.poster.length > 0) {
      return true;
    }
    return false;
  }

  Sendtodb() {
    var tm = Date.now().toString();
    var resp = this.db.collection("movies").doc(tm).set({
      "UID": tm,
      "MovieName": this.movie,
      "Year": this.year,
      "Trailer": this.trailer,
      "Link": this.dlink,
      "Poster": this.poster,
      "Language":this.language,
      "Ratings":this.ratings,
      "Genre":this.genre,
      "Runtime":this.runtime,
      "Actors":this.actors,
      "Plot":this.plot,
    });
    if (resp.toString() == "[object Promise]") {
      this.movie = "";
      this.year = "";
      this.trailer = "";
      this.dlink = "";
      this.language="";
      this.poster = "";
      this.names = [];
      this.result = "Movie added to Database";
    }
  }


}

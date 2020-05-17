import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute} from '@angular/router';
import { PlaymovieComponent } from '../playmovie/playmovie.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {
  static trailerlink="";
  static movielink="";
  static moviename="";
  static year="";
  urlSafe: SafeResourceUrl;
   trusted: any;
  validate: boolean;
  static runtime: string;
  static language: string;
  static actors: string;
  static plot: string;
  
  constructor(public dialogRef: MatDialogRef<TrailerComponent>,public sanitizer: DomSanitizer,private activatedroute:ActivatedRoute,private router:Router) {  }
 
   ngOnInit() {
     this.control();
   }
 
   control(){
   // this.trusted=this.sanitizer.sanitize(SecurityContext.URL, this.value);
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(TrailerComponent.trailerlink);
  
  }

  navigate(){
      
    this.dialogRef.close();
      PlaymovieComponent.moviename=TrailerComponent.moviename;
      PlaymovieComponent.year=TrailerComponent.year;
      PlaymovieComponent.trailerlink=TrailerComponent.trailerlink;
      PlaymovieComponent.movielink=TrailerComponent.movielink;
      PlaymovieComponent.language=TrailerComponent.language;
      PlaymovieComponent.runtime=TrailerComponent.runtime;
      PlaymovieComponent.actors=TrailerComponent.actors;
      PlaymovieComponent.plot=TrailerComponent.plot;
      //"https://drive.google.com/file/d/1oGEd5U0gC6ds0EdLAJTQ6H8d2oAj2oAL/preview";
      
      this.router.navigate(["/playmovie"]);
  }

  board()
{
  
  return TrailerComponent.moviename+"-"+TrailerComponent.year;
}


}

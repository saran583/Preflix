import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-playmovie',
  templateUrl: './playmovie.component.html',
  styleUrls: ['./playmovie.component.css']
})
export class PlaymovieComponent implements OnInit {
  static trailerlink="";
  static movielink="";
  static moviename="";
  static year="";
  urlSafe: SafeResourceUrl;
   trusted: any;
  validate: boolean;
  static language: string;
  static runtime: string;
  static actors: string;
  static plot: string;
  
  constructor(public sanitizer: DomSanitizer,private spinner:NgxSpinnerService) {  }
 
   ngOnInit() {
     this.control();
     this.spinner.show();
    
    
    
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 3000);
 
   }
 
   control(){
   // this.trusted=this.sanitizer.sanitize(SecurityContext.URL, this.value);
   this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(PlaymovieComponent.movielink); 
  }

  board()
{
  
  return PlaymovieComponent.moviename+"-"+PlaymovieComponent.year+" "+"("+PlaymovieComponent.language+")";
}

Runtime(){
  return PlaymovieComponent.runtime;
}

Actors(){
  return PlaymovieComponent.actors;
}

Plot(){
  return PlaymovieComponent.plot;
}

}

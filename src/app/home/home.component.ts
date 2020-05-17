import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute} from '@angular/router';
import { RequestComponent } from '../request/request.component';
import { FormsModule, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { MatInputModule } from '@angular/material';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PlaymovieComponent } from '../playmovie/playmovie.component';
import { TrailerComponent } from '../trailer/trailer.component';
import { MatDialog, ThemePalette } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  names = [];
  val : string ; 
  year : string ;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  buf : string ; 
  msg : string ; 
  value: unknown[];
  array: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  checking="";
  qedar= [];
  focusing: boolean;

  constructor(private db:AngularFirestore,private activatedroute:ActivatedRoute,private spinner:NgxSpinnerService, private router:Router, public dialog: MatDialog) { }

  ngOnInit() {
    
    this.ReadData();
    
    this.spinner.show();
    
    
    
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.qedar.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  onFocus(){
    this.focusing=true;
  }
  onBlur(){
    if(this.checking.length==0){
      this.focusing=false;  
    }
    
  }

navigate(counter:number){
  console.log("sequence",counter);
  PlaymovieComponent.moviename=this.value[counter]["MovieName"];
  PlaymovieComponent.year=this.value[counter]["Year"];
  PlaymovieComponent.trailerlink=this.value[counter]["Trailer"];
  PlaymovieComponent.movielink=this.value[counter]["Link"];
  PlaymovieComponent.language=this.value[counter]["Language"];
  PlaymovieComponent.runtime=this.value[counter]["Runtime"];
  PlaymovieComponent.actors=this.value[counter]["Actors"];
  PlaymovieComponent.plot=this.value[counter]["Plot"];
  //"https://drive.google.com/file/d/1oGEd5U0gC6ds0EdLAJTQ6H8d2oAj2oAL/preview";
  this.router.navigate(["/playmovie"]);
}

checkingloop(){
for(let k=0;k<this.value.length;k++){
  
  if(this.value[k]["Genre"].toLowerCase().indexOf("comedy")>=0){
    console.log(this.value[k]["Genre"]);
  }
}
}

navigatetopopup(counter:number){
  console.log("sequence",counter);
  TrailerComponent.moviename=this.value[counter]["MovieName"];
  TrailerComponent.year=this.value[counter]["Year"];
  TrailerComponent.trailerlink=this.value[counter]["Trailer"];
  TrailerComponent.movielink=this.value[counter]["Link"];
  TrailerComponent.language=this.value[counter]["Language"];
  TrailerComponent.runtime=this.value[counter]["Runtime"];
  TrailerComponent.actors=this.value[counter]["Actors"];
  TrailerComponent.plot=this.value[counter]["Plot"];
  //"https://drive.google.com/file/d/1oGEd5U0gC6ds0EdLAJTQ6H8d2oAj2oAL/preview";
  this.dialog.open(TrailerComponent,{
    panelClass: 'my-class'
  }); 
}

async ReadData(){
  return await this.db.collection("movies").valueChanges()
  .subscribe(val=>{
   console.log(val);
   this.value=val;
   console.log(this.value[0]["MovieName"])
   this.generateusernames();
   this.checkingloop();
 });
   }
 
  arrayOne(){
    for(let i=0;i<this.value["length"];i++){
      this.array[i]=i;
     console.log(this.array[i]);
   }
   return this.array.slice(0,this.value["length"]);
 }

 generateusernames(){
  for(let i=0;i<this.value["length"];i++){
    this.qedar[i]=this.value[i]["MovieName"];
  }    
}

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
movie:string;
year:string;
result:string;
msg:any;
innerwidth: number;
 constructor(private db:AngularFirestore) {  }

  ngOnInit() {
    this.innerwidth=window.innerWidth;
  }

  sendtodb(){
    var tm=Date.now().toString();
    var resp=this.db.collection("requestedmovies").doc(tm).set({
       "UID": tm, 
       "MovieName": this.movie, 
       "Year": this.year,
    });
    if(resp.toString()=="[object Promise]"){
      this.movie="";
      this.year="";
      this.msg="Movie Request submitted";
    }
  }

validate(){
  if(this.movie.length>0 && this.year.length>0){
    return true;
  }
  return false;
}
  

}

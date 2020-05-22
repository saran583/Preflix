import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  chat = "qwerty";
  movie: any;
  count=[0,1,2,3];
  year: any;
  movielink:any;
  array: any;
  urlSafe: SafeResourceUrl;
  setInterval=setInterval;
  invite: any;
  
  constructor(public sanitizer: DomSanitizer, private db: AngularFirestore, private spinner: NgxSpinnerService,private router:ActivatedRoute) { }

  ngOnInit() {
    this.control();
    this.movielink=this.router.snapshot.params['movie'];
    this.invite= this.router.snapshot.params['invite'];
    this.spinner.show();
    this.setIntrvl();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);

  }

   setIntrvl(){
    
    setInterval( () => this.getdata(),3000);
  }

 async getdata() {
    console.log(this.invite);
    var docRef =  this.db.collection("party").doc(this.invite).valueChanges()
    .subscribe(val=>{
      console.log(val);
      console.log("id of first index is", val["messages"]["id"][0]);
      this.array=val["messages"];
      console.log(this.array["id"].length);
      
    });
  }

  align(check:any){
    console.log("align parameter:",check)
    if(check=="hii"){
      return "mine";
    }
    return "other";
  }

  send(){
    console.log("this is the code",this.invite);
    var resp=this.db.collection("party").doc(this.invite).update({
      "messages.msg": firebase.firestore.FieldValue.arrayUnion(this.chat),
      "messages.id": firebase.firestore.FieldValue.arrayUnion("unknown")
    });
    console.log(resp);
    if (resp.toString() == "[object Promise]") {
    this.chat="";
    }
  }

  counter(){
    for(let i=this.count.length;i<=this.array["id"].length;i++){
      this.count[i]=i;
    }
    return this.count.slice(0,this.array["id"].length);
  }

   control() {
    // this.trusted=this.sanitizer.sanitize(SecurityContext.URL, this.value);
   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.movielink);
  }

}

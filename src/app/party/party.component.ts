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
  chat = "";
  count=[0,1,2,3];
  idname="Unknown";
  year: any;
  id=[" "];
  msgs=["Please refresh the Page"];
  startparty=0;
  movielink="";
  array: any;
  urlSafe: SafeResourceUrl;
  //setInterval=setInterval;
  invite: any;
  loggedin=0;
  
  constructor(public sanitizer: DomSanitizer, private db: AngularFirestore, private spinner: NgxSpinnerService,private router:ActivatedRoute) { }

  ngOnInit() {
    this.invite= this.router.snapshot.params['invite'];
    this.getmovie();
    this.spinner.show();
    //this.setIntrvl();
    this.getdata();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);

  }

  //  setIntrvl(){
    
  //   setInterval( () => this.getdata(),3000);
  // }

 getmovie()
   {
  //   if(this.movielink.length<1){
  //     this.movielink=movie;
  //     console.log(this.movielink);
  //     this.control();
  //   }

    var docRef =  this.db.collection("party").doc(this.invite).valueChanges()
    .subscribe(val=>{
      this.movielink=val["messages"]["movie"];
      console.log(this.movielink);
      if(this.loggedin == 0){
        this.control();
        this.loggedin=1;
        }
      
    });
    
  }

 async getdata() {
    console.log(this.invite);
    var docRef =  this.db.collection("party").doc(this.invite).valueChanges()
    .subscribe(val=>{
      console.log(val);
      console.log("id of first index is", val["messages"]["msg"][0]);
      this.array=val["messages"]["msg"];
      console.log(this.array.length);
      this.decrypt();
    });
  }
decrypt(){
for(let i=this.msgs.length-1;i<this.array.length;i++){
    var buf=this.array[i].split("-");
    console.log("this is the decrypt",buf[0]);
    this.id[i]=buf[0];
    this.msgs[i]=buf[1];
}

}
  
  align(check:string){
    console.log("align parameter:",check)
    if(check==this.idname){
      return "mine";
    }
    return "other";
  }

  start(){
    this.startparty=1;
  }
  send(){
    this.chat=this.chat.trim();
    if(this.chat.length>0){
    console.log("this is the code",this.invite);
    var tm=Date.now().toString();
    var resp=this.db.collection("party").doc(this.invite).update({
      "messages.msg": firebase.firestore.FieldValue.arrayUnion(this.idname+"-"+this.chat+"-"+tm),
    });
    console.log(resp);
    if (resp.toString() == "[object Promise]") {
    this.chat="";
    }

  }

  }

  counter(){
    for(let i=this.count.length;i<=this.msgs.length;i++){
      this.count[i]=i;
    }
    return this.count.slice(0,this.msgs.length);
  }

   control() {
    // this.trusted=this.sanitizer.sanitize(SecurityContext.URL, this.value);
   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.movielink);
  }

  arrayOne(n: string): any[] {
    var len=n.length;
    len=len/25;
    var extra=len/5;
    extra=Math.floor(extra);
    extra=extra*2;
    len=len-extra;
    console.log(len);
    return Array(Math.floor(len+1));
  }

}

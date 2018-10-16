import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireList} from 'angularfire2/database';
import { AngularFireObject} from 'angularfire2/database';
import { AngularFireAuthModule, AUTH_PROVIDERS} from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app'
import { resolve } from 'dns';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public afAuth:AngularFireAuth) { 
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
   });
  }
  loginGoogle() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      })
    })
  }
  loginFb(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })  
  }
  loginEmail(value){
      return new Promise<any>((resolve, reject) => {
        this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
      })
    }
  
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}

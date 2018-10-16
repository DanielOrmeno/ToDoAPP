import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireList} from 'angularfire2/database';
import { AngularFireObject} from 'angularfire2/database';
import { AngularFireAuthModule, AUTH_PROVIDERS} from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FormsModule, ReactiveFormsModule, FormGroup,FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app'
import { resolve } from 'dns';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(public afAuth:AngularFireAuth) { 
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
   });
  }
  register(value){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  ngOnInit() {
  }

}


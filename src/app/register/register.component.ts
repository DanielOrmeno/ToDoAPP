import { Component } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
   });
  }

  register(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.router.navigate(['/todo']);
      }, err => {
        reject(err);
      });
    });
  }
}


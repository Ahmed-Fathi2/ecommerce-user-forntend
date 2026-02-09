import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  constructor(private authservice: Auth , private router:Router) { }


  isLoading = signal<boolean>(false);
  errormsg = signal<string>("");

  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])

  })


  Submit() {

    let userdata = this.loginForm.value;
    this.isLoading.set(true);

    if (this.loginForm.valid) {

      this.authservice.LoginApi(userdata).subscribe({
        next: (res) => {
          console.log(res);
          
          this.isLoading.set(false);

          //1- save token in local storage
          console.log(res.token);
          localStorage.setItem("usertoken", res.token)
          
          //2- call service to decode token
          this.authservice.DecodeToken();
          
          //3- navigate to home page

          this.router.navigate(["/register"]);
        },
        error: (err) => {
          console.log(err)
          this.errormsg.set(err.error?.["message"]);
          this.isLoading.set(false);
        }

      })

    }
    else {

      console.log(this.loginForm);
      this.loginForm.markAllAsTouched();
      this.errormsg.set("");
      this.isLoading.set(false);

    }

  }
}

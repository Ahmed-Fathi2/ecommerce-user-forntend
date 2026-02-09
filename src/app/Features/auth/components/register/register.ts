import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  errormsg = signal<string>("");
  isLoading = signal<boolean>(false);

  constructor(private authservice: Auth, private router: Router) { }

  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }, this.passwordsMatch)

  Submit() {

    
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      this.isLoading.set(true);

      let useremail = this.registerForm.value.email;
      console.log(useremail)
      this.authservice.FindUserByEmail(useremail).subscribe({
        next: (res) => {
          console.log(res)
          if (res.length > 0) {
            //error msg -->user already exist
            this.errormsg.set("user already exist");
            this.isLoading.set(false);
          }
          else {
            this.authservice.RegisterApi(this.registerForm.value).subscribe({
              next: () => {
                this.isLoading.set(false);
                this.router.navigate(['/login']);
              },
              error: (err) => {
                this.isLoading.set(false);
                this.errormsg.set("register call backend return error");
              }

            })
          }

        },
        error: (err) => {
          this.isLoading.set(false);
          this.errormsg.set("login call backend return error");
        }
      })




    }

    else {
      console.log(this.registerForm)
      this.registerForm.markAllAsTouched();
     this.errormsg.set("");


    }

  }


  passwordsMatch(a: AbstractControl) {
    if (a.get("password")?.value === a.get("confirmPassword")?.value) {

      return null;
    }
    else {

      return { mismatch: true };
    }
  }

}

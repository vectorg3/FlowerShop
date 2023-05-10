import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private auth: AuthService, private router: Router) {}
  aSub: Subscription;
  regForm: FormGroup;
  requestError: any;
  isErrorDisplay: boolean = false;
  log(){
    console.log(this.regForm.value.password == this.regForm.value.repeatPassword);
  }
  submitRegister() {
    this.regForm.disable();
    this.aSub = this.auth.register(this.regForm.value).subscribe({
      next: () => {
        this.router.navigate(['/store']);
      },
      error: (error) => {
        this.isErrorDisplay = true;
        this.requestError = error.error.msg;
        console.warn(error);
        this.regForm.enable();
      },
    });
  }
  ngOnInit() {
    this.regForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\u0400-\u04FF]+$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ),
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
    });

  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

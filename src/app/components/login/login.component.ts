import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router, private _toastr: ToastrService ,
    public translate:TranslateService){}
  loginForm!:FormGroup
  hide = true;

  createForm():void{
    this.loginForm =this._FormBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }
  ngOnInit(): void {
    this.createForm()
  }
  login(formData:FormGroup){
    if(formData.valid){
      this._AuthService.login(formData.value).subscribe({
        next:res =>{
          if(res.message == "success" ){
            console.log(res);
            localStorage.setItem("userToken",res.token)
            this._AuthService.decode()
            this._toastr.success("Logged in sucessfully" , 'Success' , {
              timeOut: 1500,
            });
            this._Router.navigate(['/home'])
          }
          else{
            this._toastr.warning(res.message, 'Ooops' , {
              timeOut: 3000,
            });
          }
        }
      })
    }
  }

}

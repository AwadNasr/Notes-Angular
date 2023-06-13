import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _FormBuilder:FormBuilder ,
    public translate:TranslateService,
     private _AuthService:AuthService , private _Router:Router, private _toastr: ToastrService){}
  registerForm!:FormGroup
  hide = true;

  createForm():void{
    this.registerForm =this._FormBuilder.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      age:['',[Validators.required]],
    })
  }
  ngOnInit(): void {
    this.createForm()
  }
  register(formData:FormGroup){
    if(formData.valid){
      this._AuthService.register(formData.value).subscribe({
        next:res =>{
          if(res.message == "success" ){
            this._Router.navigate(['/login'])
          }
          else{
            console.log(res.errors.email.message);
            this._toastr.warning(res.errors.email.message, 'Ooops' , {
              timeOut: 3000,
            });
          }
        }
      })
    }
  }
}

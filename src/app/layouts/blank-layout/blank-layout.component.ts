import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {
  currentLang!:string
  
  constructor(private _AuthService:AuthService,
    private _Router:Router,
    public translate:TranslateService
    ){
      this.currentLang=localStorage.getItem('currentLang') || 'en'
    this.translate.use(this.currentLang)
  }
  userName:string=localStorage.getItem('userName')!
  logout(){
    localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    this._AuthService.currentUser.next(null)
    this._Router.navigate(['/login'])
  }
  changeCurrentLang(lang:string){
    this.translate.use(lang);
    localStorage.setItem('currentLang',lang)
  }

}

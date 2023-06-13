import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuName:string=''
  currentLang!:string
  constructor(private _Router:Router,public translate:TranslateService){
   this._Router.events.subscribe({
      next:((res) =>{
        if(res instanceof NavigationEnd){
          this.menuName=res.url.replace("/"," ")
        }
      })
    })
    this.currentLang=localStorage.getItem('currentLang') || 'en'
    this.translate.use(this.currentLang)
  }
  changeCurrentLang(lang:string){
    this.translate.use(lang);
    localStorage.setItem('currentLang',lang)
  }

}

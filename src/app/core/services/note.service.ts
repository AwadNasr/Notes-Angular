import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private _HttpClient:HttpClient,public translate:TranslateService) {
   }

  addNote(data:any):Observable<any>{
    return this._HttpClient.post(environment.baseUrl + 'addNote' ,data)
  }
  updateNote(data:any):Observable<any>{
    return this._HttpClient.put(environment.baseUrl + 'updateNote' ,data)
  }
  getNotes(model:any):Observable<any>{
    return this._HttpClient.get(environment.baseUrl + 'getUserNotes' ,{
      headers:model
    })
  }
  deleteNote(data:any):Observable<any>{
    return this._HttpClient.delete(environment.baseUrl + 'deleteNote',data )
  }
}

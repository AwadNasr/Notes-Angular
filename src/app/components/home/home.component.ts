import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NoteService } from 'src/app/core/services/note.service';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
rgb(arg0: number,arg1: number,arg2: number): string|undefined {
throw new Error('Method not implemented.');
}
  constructor(public dialog: MatDialog ,
     private _NoteService:NoteService,private _toastr: ToastrService,
     public translate:TranslateService
     ) {}
  userId:any=jwtDecode(localStorage.getItem('userToken')!)
  notes:any[]=[]
  value = '';
  openDialog() {

    const dialogRef = this.dialog.open(NoteDataComponent);
    dialogRef.afterClosed().subscribe(res => {
      if(res=='done'){
       this.getAllNotes()
      }

    });
  }
  ngOnInit(): void {
    this.getAllNotes()
  }

  getAllNotes(){
    console.log(this.userId._id , localStorage.getItem('userToken'));

    let model={
      userID:this.userId._id,
      Token:localStorage.getItem('userToken')
    }
    this._NoteService.getNotes(model).subscribe({
      next:res=>{
        console.log(res)
        if(res.message == 'success'){
          this.notes=res.Notes
          console.log(this.notes);
        }
      },
      error:err=>{
        console.log(err);


      }
    })
  }
  deleteNote(noteId:any,index:number){
    const model={
      body:{
        NoteID:noteId,
        token:localStorage.getItem('userToken'),
      }
    }
    this._NoteService.deleteNote(model).subscribe({
      next:res=>{
        if(res.message=='deleted'){
          this.notes.splice(index,1)
          this.notes=[...this.notes]
          this._toastr.success(res.message, '' , {
            timeOut: 2000,
          })
        }
      }
    })
  }

  sendData(note:any){
    const dialogRef = this.dialog.open(NoteDataComponent,
      {data:{note}});
      dialogRef.afterClosed().subscribe(res => {
        if(res=='done'){
         this.getAllNotes()
        }
      });
  }

}

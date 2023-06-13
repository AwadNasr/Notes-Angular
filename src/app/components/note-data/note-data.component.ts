import { Component, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css']
})
export class NoteDataComponent {
  constructor(private _FormBuilder:FormBuilder ,
     private _toastr: ToastrService ,
     private _NoteService:NoteService,
     private _MatDialogRef:MatDialogRef<NoteDataComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,
     ){}
  noteForm!:FormGroup
  userId:any=jwtDecode(localStorage.getItem('userToken')!)
  ngOnInit(): void {
this.createForm()
  }

  createForm():void{
    this.noteForm =this._FormBuilder.group({
      title:[this.data ? this.data.note.title :'' ,[Validators.required]],
      desc:[this.data ? this.data.note.desc :'',[Validators.required]],
      userID:this.userId._id,
      token:localStorage.getItem('userToken')
    })
  }
  sendData(){
    if(this.noteForm.valid){
      if(this.data ==null){
        this.addNote(this.noteForm.value)
      }else{
        this.updateNote()
      }

    }
  }
  addNote(data:any){
    this._NoteService.addNote(data).subscribe({
      next:res =>{
        console.log(res);

        if(res.message == 'success'){
          this._toastr.success('Note added successfully', 'Success' , {
            timeOut: 2000,
          })
          this._MatDialogRef.close("done")
          console.log(res)
        }
      }
    })
  }
  updateNote(){
    const model={
      ...this.noteForm.value,
      token:localStorage.getItem('userToken'),
      NoteID:this.data.note._id
    }
    this._NoteService.updateNote(model).subscribe({
      next:res=>{
        if(res.message == 'updated'){
          this._toastr.success('Note updated successfully', 'Success' , {
            timeOut: 2000,
          })
          this._MatDialogRef.close("done")
          console.log(res)
        }
      }
    })
  }
}

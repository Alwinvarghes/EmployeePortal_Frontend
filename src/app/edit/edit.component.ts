import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { EmployeeModel } from '../employee.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  //varible data store
  employees:EmployeeModel ={}
    //activated route class is used to access id from the url
    constructor(private route:ActivatedRoute,private api:ApiServiceService,private router:Router){}

    ngOnInit(): void {
      this.route.params.subscribe((res)=>{
           console.log(res);
           const {id} = res
           console.log(id);
           this.getExistingId(id)
           })

    }
 //get employee details
    getExistingId(id:any){
      this.api.getAEmployeeApi(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.employees = res
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }

//update fuction employee details
updateEmployee(id:any){
  this.api.updateEmployeeApi(id,this.employees).subscribe({
    next:(res)=>{
     console.log(res);
     alert('Update successfully')
     this.router.navigateByUrl('employee')
    },
    error:(err)=>{
    console.log(err);
       
    }
  })
}

//cancel edit employee details
cancelEdit(id:any){
  this.getExistingId(id)
}
}

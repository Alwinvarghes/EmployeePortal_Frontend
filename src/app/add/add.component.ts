import { Component } from '@angular/core';
import { EmployeeModel } from '../employee.model';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
    
employee:EmployeeModel={}
constructor(private api:ApiServiceService,private router:Router){}

//function to delete all details in the field.
cancelEmployee(){
  this.employee={}
}

addEmployee(){
  console.log(this.employee);
  this.api.addEmployeeApi(this.employee).subscribe({
    next:(res:EmployeeModel)=>{
      console.log(res);
      
      Swal.fire({
        title: "wow",
        text: "Employeee Add successfully",
        icon: "success",
      })
      this.router.navigateByUrl('employee')
    },
    error:(err:any)=>{
     console.log(err);
     
    }
  })
  
}
}

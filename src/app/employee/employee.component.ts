import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../employee.model';
import { ApiServiceService } from '../services/api-service.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployee:EmployeeModel[]=[]

  searchKey:string =""

  //pagenation
  p: number = 1;
  
  

  adminLoginTime:any = new Date

  constructor(private api:ApiServiceService){}

 ngOnInit(): void {//usEffect polethe first  implements OnInit load data on page loaded.
   this.getAllEmployee()
   console.log(this.searchKey);
   
 }

  getAllEmployee(){
     this.api.getAllEmployeeAPi().subscribe({
      next:(res:any)=>{
      console.log(res);
      this.allEmployee = res
      
      },
      error:(err:any)=>{
        console.log(err);
        
      }
     })
  }

  sortId(){
    this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
  }


  //localeCompare()- method to compare two string
  //return -1,1,0(for before , after , equal)
  //syntax
  //string.loacleCompare(compareString)
  sortName(){
    this.allEmployee.sort((a:any,b:any)=>a.username.localeCompare(b.username))
  }


  //method to generate pdf
  generatePdf(){
    //create an object for jspdf class
    const pdf = new jsPDF()
    let head =[['id','username','email','status']]
    let body:any =[]

  //since we have date from backend and the body should be nested array
    this.allEmployee.forEach(item=>{
      body.push([item.id,item.username,item.email,item.status])
    })
    autoTable(pdf,{head,body})

    //heading
    pdf.text('Employee Details',10,10)

    //font size
    pdf.setFontSize(16)

    //new tabil kannae vandi
    pdf.output('dataurlnewwindow')
    
    //save
    pdf.save('EmployeeTable.pdf')
  }


//delete employees details
  deleteEmployee(id:any){
    this.api.deleteEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert('delete successfully')
        this.getAllEmployee()
        },
        error:(err:any)=>{
          console.log(err);
          
        }
    })
  }
}

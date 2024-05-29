import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  serverUrl = 'https://employeeportal-server-bqrk.onrender.com'

  constructor(private http:HttpClient) { }

  loginApi(){//return observable
    return this.http.get(`${this.serverUrl}/Employees/1`)
    
  }

  //api to add employee
  addEmployeeApi(employee:EmployeeModel){
     return this.http.post(`${this.serverUrl}/Employees`,employee)
  }

  //api get all employee 
  getAllEmployeeAPi(){
    return this.http.get(`${this.serverUrl}/Employees`)
  }

  //delete employee api
  deleteEmployeeApi(id:any){
    return this.http.delete(`${this.serverUrl}/Employees/${id}`)
  }

  //api to get details of a particular employee
  getAEmployeeApi(id:any){
    return this.http.get(`${this.serverUrl}/Employees/${id}`)
  }

  //api update particular employee details
  updateEmployeeApi(id:any,body:any){
    return this.http.put(`${this.serverUrl}/Employees/${id}`,body)
  }

  //update admin api
  updateAdminApi(reBody:any){
    return this.http.put(`${this.serverUrl}/Employees/1`,reBody)
  }
}

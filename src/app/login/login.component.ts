import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginEmail:string = ""
  loginPswd:string = ""

  constructor(private api:ApiServiceService, private router: Router){}

  login(){
    if(!this.loginEmail || !this.loginPswd){
      Swal.fire({
        title: "Oops",
        text: "Please fill the form",
        icon: "info",
        
      })

    }else{
      this.api.loginApi().subscribe({
        next:(res:any)=>{
           console.log(res);
           const {email,password} = res
           if(email == this.loginEmail && password == this.loginPswd){
            Swal.fire({
              title: "wow",
              text: "Login successfully",
              icon: "success",
            })
            
            this.router.navigateByUrl('home')
           }
           else{
            Swal.fire({
              title: "Oops",
              text: "Invalid email and password",
              icon: "info",
              
            })
           }
           },
           
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
  }

}

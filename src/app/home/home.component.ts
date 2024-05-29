import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  selected:Date |null = new Date()
  adminStatus:boolean = false
  //state create to admin data store cheyanne
  adminDetails:any = {}
  profileImg:string='https://cdn-icons-png.freepik.com/512/7718/7718888.png'
//sidebar using function
  showSideBar:boolean = true
//count of employees
employeeCount:number = 0

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {};

  constructor(private api:ApiServiceService){
    this.chartOptions ={
      chart: {
        type: 'pie'
    },
    title: {
        text: 'project Completion Report'
    },
    
    credits:{
      enabled:false//remove  water mark highchart
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Chrome',
                    y: 55.02
                },
                {
                    name: 'Firefox',
                    sliced: true,
                    
                    y: 26.71
                },
                {
                    name: 'safari',
                    y: 1.09
                },
                {
                    name: 'Edge',
                    y: 15.5
                },
                {
                    name: 'Opera',
                    y: 1.68
                }
            ]
        }
    ]

    }
    HC_exporting(Highcharts);

    //function to get admin details
    this.getAdminDetails()
  }
  ngOnInit(): void {
      this.getAllemployee()
  }

  getAdminDetails(){
    this.api.loginApi().subscribe({
        next:(res)=>{
            console.log(res);
            this.adminDetails = res
           
            },
        error:(err)=>{
            console.log(err);
            
        }
    })
  }

  //admin status

  adminEdit(){
    this.adminStatus = true
  }
  adminCancel(){
    this.getAdminDetails()
    this.adminStatus = false
  }

  //get file in our system
  getfile(event:any){
      let file = event.target.files[0]
      console.log(file);
      let fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (event:any)=>{
        console.log(event.target.result);
        this.profileImg = event.target.result
        this.adminDetails.picture = event.target.result
        
      }
      
      
  }

  //upadte admin api
  updateAdmin(){
    this.api.updateAdminApi(this.adminDetails).subscribe({
        next:(res)=>{
            console.log(res);
        Swal.fire({
                title: "wow",
                text: "Update successfully",
                icon: "success",
              })
            this.adminDetails = res
            this.adminStatus =false
            },
        error:(err)=>{
          console.log(err);
          
        }
    })
  }

  //function to handle sidebar
  handleSiderBar(){
    this.showSideBar = !this.showSideBar
  }

getAllemployee(){
    this.api.getAllEmployeeAPi().subscribe({
        next:(res:any)=>{
            console.log(res);
            this.employeeCount = res.length
            
        },
        error:(err:any)=>{
            console.log(err);
            
        }
    })
}
  
}

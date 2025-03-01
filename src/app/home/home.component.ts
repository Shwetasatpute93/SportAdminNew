import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public getdata :any;
  turfid :any;
  turfname:any;
  constructor(private router: Router, private adminService: ApiService) { }

  ngOnInit(): void {

    this.turfid = localStorage.getItem('regid');
    this.turfname = localStorage.getItem('turfname');
    this.getcustomerDetails();
  }

 async getcustomerDetails(){

    
  let seq = this.adminService.post('/RegisterAdminApi/getTurfcustDetails',{id : this.turfid});

   seq.subscribe(async (res:any)=>{
    console.log(res);
    this.getdata =res?.Data;
  
    // this.router.navigate(['/landing']);
 
  });


  }

}

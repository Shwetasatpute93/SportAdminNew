import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [DatePipe]
})
export class LandingComponent implements OnInit {

  turfid:any;
  turfname:any;
  date: any;
  newdate:any;
  record:any;
  dailyrecord: any;
  datadiv:boolean = true
  weekdiv:boolean = true
  monthdiv:boolean = true
  //hiding info box
  visible:boolean = false
  weekvisible: boolean = false;
  monthvisible: boolean = false;
  name: any;
  weekrecord: any;
  monthrecord: any;
  constructor(private datePipe: DatePipe, private adminservice : ApiService) { }

  ngOnInit(): void {

    this.turfid = localStorage.getItem('regid');
    this.turfname = localStorage.getItem('turfname');
    // console.log(this.turfname)

    this.getcount();
  }


  getcount(){
    
    this.date = new Date();

    this.newdate = this.datePipe.transform(this.date, 'dd-MM-yyyy');

    // console.log(this.newdate);

    let obj = {
       
       id : this.turfid,
       date: this.newdate
    }

    this.adminservice.post('/RegisterAdminApi/getTurfcustDetails', obj).subscribe((res:any) => {

      this.record = res.Data.length;
      // console.log(this.record);
    });

    this.adminservice.post('/RegisterAdminApi/getdailypaymentcount', obj).subscribe((res:any) => {

      this.dailyrecord = res.Data[0].rate;
      // console.log(this.dailyrecord);
    });

    this.adminservice.post('/RegisterAdminApi/getweekpaymentcount', obj).subscribe((res:any) => {

      this.weekrecord = res.Data[0].rate;
      // console.log(this.weekrecord);
    });

    this.adminservice.post('/RegisterAdminApi/getmonthlypaymentcount', obj).subscribe((res:any) => {

      this.monthrecord = res.Data[0].rate;
      // console.log(this.monthrecord);
    });
  }

  dailyPayment(){

    this.date = new Date();

    this.newdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    // console.log(this.newdate);

    let obj = {
       
       id : this.turfid,
       date: this.newdate
    }

    this.adminservice.post('/RegisterAdminApi/getdailyPaumentDetails', obj).subscribe((res:any) => {

      this.dailyrecord = res.Data;
      
      this.visible = true;
      this.datadiv = false;
      this.weekvisible = false;
      this.weekdiv = false;
      this.monthvisible = false;
      this.monthdiv = false;
      

    })

  }

  weeklyPayment(){

    this.date = new Date();

    this.newdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    // console.log(this.newdate);

    let obj = {
       
       id : this.turfid,
       date: this.newdate
    }

    this.adminservice.post('/RegisterAdminApi/getweeklyPaymentDetails', obj).subscribe((res:any) => {

      this.weekrecord = res.Data;
      
      this.visible = false;
      this.datadiv = false;
      this.weekvisible = true;
      this.weekdiv = false;
      this.monthvisible = false;
      this.monthdiv = false;
      
      
      

    })
  }

  monthlyPayment(){

    this.date = new Date();

    this.newdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    // console.log(this.newdate);

    let obj = {
       
       id : this.turfid,
       date: this.newdate
    }

    this.adminservice.post('/RegisterAdminApi/getmonthlyPaymentDetails', obj).subscribe((res:any) => {

      this.monthrecord = res.Data;
      
      this.visible = false;
      this.datadiv = false;
      this.weekvisible = false;
      this.weekdiv = false;
      this.monthvisible = true;
      this.monthdiv = false;
      
      
      

    })
  }


}

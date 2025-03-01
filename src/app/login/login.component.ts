import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;
  public adminForm : FormGroup;
  loginuser : any;
  turfid: any;
  turfname:any;

  mobile = [9130657115, 7559139861];

  constructor(private route: Router,private adminService:ApiService, public fb: FormBuilder,private snackBar: MatSnackBar) {

    this.loginForm = this.fb.group({ 
      mobileno: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
      password: ['', Validators.required]
    });

    this.adminForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
    });
   }

  ngOnInit(): void {

    // console.log(this.mobile);
  }

  get mobileno(){
     return this.loginForm.get('mobileno');
  }
  get password(){
    return this.loginForm.get('password');
 }

  Login(){

    let obj ={
      mobileno : this.loginForm.value.mobileno,
      password: this.loginForm.value.password
    }

    this.adminService.post('/RegisterAdminApi/userlogin', obj).subscribe((res:any) =>{

        this.loginuser = res.Data;

        if(res.status == 'success')
        {
          this.turfid = this.loginuser[0].regid;
          this.turfname = this.loginuser[0].turfname;
          localStorage.setItem('regid', this.turfid);
          localStorage.setItem('turfname', this.turfname);
          this.route.navigate(['/landing']);
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        }
       else{
        this.snackBar.open('Login Invalid!', 'Close', {
          // duration: 3000,
          panelClass: ['snackbar-error']
        });
       }
      
    }, err =>{
      alert('error');
    })

  }

  // enquiry(){

  //     this.route.navigate(['/admin']);
  // }
  adminregist(){
    // alert(this.mobile[0]);

    let mobileobj = {
      mobile : this.adminForm.value.mobile
    }

      if(this.mobile[0] == mobileobj.mobile || this.mobile[1] == mobileobj.mobile){

        this.route.navigate(['/profile']);
        
      }
      else{
        // alert('please enter valid number');
        this.snackBar.open('Please Enter Valid Number!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.adminForm.reset();
      }
  }

  close(){
    this.adminForm.reset();
  }
}

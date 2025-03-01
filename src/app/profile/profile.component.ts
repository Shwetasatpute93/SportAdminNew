import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public turfForm!: FormGroup;
  regsadmin :any;
  constructor(public fb : FormBuilder, private adminService:ApiService, public router:Router) {

   
  }
  ngOnInit(): void {
    this.turfForm = this.fb.group({
      mobileno: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
      turfname: ['', Validators.required],
      address: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{5,6}$')]],
      password:['', Validators.required]
    });
  }

  get mobileno() {
    return this.turfForm.get('mobileno');
  }

  get turfname() {
    return this.turfForm.get('turfname');
  }

  get address() {
    return this.turfForm.get('address');
  }

  get area() {
    return this.turfForm.get('area');
  }
  get city() {
    return this.turfForm.get('city');
  }

  get pincode() {
    return this.turfForm.get('pincode');
  }
  get password() {
    return this.turfForm.get('password');
  }

  async Savedetails(){
    if (this.turfForm.invalid) {
      this.turfForm.markAllAsTouched();
      return;
    }
    let obj = {
      mobileno: this.turfForm.value.mobileno,
      turfname: this.turfForm.value.turfname,
      address: this.turfForm.value.address,
      area: this.turfForm.value.area,
      city: this.turfForm.value.city,
      pincode: this.turfForm.value.pincode,
      password: this.turfForm.value.password
    };
  
    // console.log(obj);

    let seq = this.adminService.post('/RegisterAdminApi/Adminregister',obj);

 await seq.subscribe(async (res:any)=>{
    // console.log(res);
    this.regsadmin =res?.data;
  
    this.router.navigate(['']);
 
  });

  }

}

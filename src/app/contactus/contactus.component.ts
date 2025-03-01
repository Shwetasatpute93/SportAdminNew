import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  public getdata :any;
  turfid :any;
  turfname:any;
  constructor(private router: Router, private adminService: ApiService) { }

  ngOnInit(): void {

    this.turfid = localStorage.getItem('regid');
    this.turfname = localStorage.getItem('turfname');
    
  }

}

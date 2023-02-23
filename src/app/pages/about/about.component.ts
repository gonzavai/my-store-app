import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/interfaces/staff-info';
import { PageInfoService } from 'src/app/services/page-info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  team: Person[] = [];
  subscription: Subscription = new Subscription;
  constructor(public _pageInfo: PageInfoService) { }

  ngOnInit(): void {
    this._pageInfo.getInfoAboutStaff();
   }

}

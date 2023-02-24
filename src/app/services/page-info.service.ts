import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageInfo } from '../interfaces/page-info';
import { Person, StaffInfo } from '../interfaces/staff-info';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageInfoService {
  pageInfo: PageInfo = {};
  staffInfo: StaffInfo = {};
  teamInfo$ = new Subject<Person[]>();
  //staffInfo: StaffInfo = {};
  isInfoLoaded = false;

  constructor(private http: HttpClient) {}

  getPageInfo() {
    this.http
      .get('https://angular-shoppingstore-default-rtdb.firebaseio.com/page-info')
      .subscribe((resp: PageInfo) => {
        this.isInfoLoaded = true;
        this.pageInfo = resp;
      });
  }

  getInfoAboutStaff() {
    this.http
      .get(
        'https://angular-shoppingstore-default-rtdb.firebaseio.com/staff.json'
      )
      .subscribe((resp: any) => {
        this.staffInfo.staff = resp;
        if (this.staffInfo.staff) {
          this.teamInfo$.next(this.staffInfo.staff);
        }
      });
  }
}

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
      .get('../assets/data/data-page.json')
      .subscribe((resp: PageInfo) => {
        this.isInfoLoaded = true;
        this.pageInfo = resp;
        console.log('Page Info loaded', this.pageInfo);
      });
  }

  getInfoAboutStaff() {
    this.http
      .get(
        'https://angular-shoppingstore-default-rtdb.firebaseio.com/staff.json'
      )
      .subscribe((resp: any) => {
        console.log('Respuesta del servicio', resp);
        this.staffInfo.staff = resp;
        console.log('Staf Info loaded', this.staffInfo);
        if (this.staffInfo.staff) {
          this.teamInfo$.next(this.staffInfo.staff);
          console.log('++++ TEAM INFO:', this.staffInfo.staff);
        }
      });
  }
}

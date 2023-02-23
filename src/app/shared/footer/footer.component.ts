import { Component, OnInit } from '@angular/core';
import { PageInfo } from 'src/app/interfaces/page-info';
import { PageInfoService } from 'src/app/services/page-info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currenDate: Date = new Date();
  pageInfo: PageInfo = this.pageInfoServie.pageInfo;

  constructor(public pageInfoServie: PageInfoService) { }

  ngOnInit(): void {
  }

}

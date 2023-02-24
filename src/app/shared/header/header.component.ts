import { Component, OnInit } from '@angular/core';
import { PageInfo } from 'src/app/interfaces/page-info';
import { PageInfoService } from 'src/app/services/page-info.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pageInfo: PageInfo = this.pageInfoService.pageInfo;

  constructor(
    public pageInfoService: PageInfoService,
    public _products: ProductsService
    ) { 
  }

  ngOnInit(): void {
  }

  findProduct(value: string): void {
    this._products.filterByName(value);
  }

}

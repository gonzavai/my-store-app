import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {

  codProd: string = '';

  constructor(
    public _products: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Entro a Item PAge');
    this.activatedRoute.queryParamMap.subscribe((param) => {
      console.log("CODIGO DE PRODUCTO PARAM", param.get('cod'));
      this.codProd = param.get('cod')?? '';
      this._products.getProductoByCod(this.codProd)
    });
  }
}

import { Component, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { Product } from 'app/shared/models/product.model';
import { CartItem, ShopService } from 'app/views/shop/shop.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search-association',
  templateUrl: './search-association.component.html',
  styleUrls: ['./search-association.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchAssociationComponent),  
      multi: true
    }
  ]
})
export class SearchAssociationComponent implements OnInit, OnDestroy {
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;

  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: UntypedFormGroup;
  public cart: CartItem[];
  public cartData: any;

  constructor(private fb: UntypedFormBuilder ) { }

  ngOnInit() {
    
    
  }
  ngOnDestroy() {

  }
 

  buildFilterForm(filterData:any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    })
  }
  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category)
  }
  
  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }
}

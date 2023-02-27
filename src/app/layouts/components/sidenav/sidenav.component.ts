import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  @ViewChild('sidenav') sidenav:ElementRef;
  
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit() {
    setTimeout(() => {
      const links = this.sidenav.nativeElement.querySelectorAll('li[appdropdownlink]');
      [...links].forEach(link => {
        if(link.querySelector('a.open')) {
          link.classList.add('open');
        }
      })
    })
  }

}
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResultViewModel } from 'app/models/result-view-model';
import WebsiteInfoModel from 'app/models/website-info-model';
import { GrapesConfigService } from 'app/website-builder/services/grapes.config.service';
import { WebsiteService } from 'app/website-builder/services/website.service';
import { WebsiteThemeFactory } from 'app/website-builder/services/website.theme.factory';
import { WebsiteThemeService } from 'app/website-builder/services/website.theme.service.';
import { Console } from 'console';
import grapesjs from 'grapesjs';
import BasicBlocksPlugin from 'grapesjs-blocks-basic';
import FlexyBlocksPlugin from 'grapesjs-blocks-flexbox';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuilderComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gjs') gjsContainer: ElementRef;

  private ngUnsubscribe$ = new Subject<void>();
  public htmlContentForCanvas:string ='<h1> This is testing</h1>';
  
  public editor: any = null
  public websiteThemeService: WebsiteThemeService;
  resultViewModel: ResultViewModel = new ResultViewModel();
  websiteInfo: WebsiteInfoModel;

  constructor(private configService: GrapesConfigService,
    private websiteThemeFactory: WebsiteThemeFactory,
     private router:Router, 
     private activatedRoute: ActivatedRoute,
     private websiteService: WebsiteService) {
      super();
  }


  ngOnInit(): void {
    let themeName = window.history.state?.selectedTheme;
    let referenceId = window.history.state?.referenceId;
    

    if(themeName){
     this.websiteThemeService = this.websiteThemeFactory.getWebsiteBuilderTheme(themeName);
    }else if(referenceId){
      this.websiteService
      .retrieveWebsiteById(referenceId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        Object.assign(this.resultViewModel, response);
        this.websiteInfo = this.resultViewModel.result;
        Object.assign(this.messages, response);
      });
    }
  
    this.initializeGrapesJs();
  }

  ngAfterViewInit(): void { 
    
  }
  ngOnDestroy() { 
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private initializeGrapesJs() {
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '700px',
      width: 'auto',
      storageManager: false,
      selectorManager: { 
        appendTo: ".classes-container",
        componentFirst: true ,
      },
      panels: { defaults: [] },
      traitManager: this.configService.getTraitManager(),
      blockManager: this.configService.getBlockManager(),    
      styleManager: this.configService.getStyleSelectors(),
      layerManager: this.configService.getLayerManager(),
      assetManager :this.configService.getAssetManager(),
      colorPicker: { appendTo: 'parent', offset: { top: 26, left: -166, } },
      plugins: [BasicBlocksPlugin, FlexyBlocksPlugin],
      pluginsOpts: {
        BasicBlocksPlugin: {},
        FlexyBlocksPlugin: {},
      },
      canvas: {
        styles: this.websiteThemeService.getStyles() ,
        scripts: this.websiteThemeService.getScripts() ,
      },
    });

    this.configService.assetManagerEvents(this.editor);
    this.websiteThemeService.addNavbarBlock(this.editor);
    this.websiteThemeService.addHomePageBlock(this.editor);
    
    this.configService.addDeviceToPanel(this.editor);
    this.configService.addRightSidePanel(this.editor);
    this.configService.addButtonsToRightPanel(this.editor);
    this.editor.on('load', () => {
      const canvasWindow = this.editor.Canvas.getWindow();
      setTimeout(() => {
        if (canvasWindow.document.readyState === 'complete') {
          canvasWindow.loadFromGrapesJS();
        }
      }, 1000);
    });

    
    this.editor.setComponents(this.websiteThemeService.getHtmlContent());
    // this.editor.on('component:selected', () => {
    //   const selectedComponent = this.editor.getSelected();;
    //   if (selectedComponent && selectedComponent.get('tagName') === 'a') {
    //     this.editor.runCommand('show-traits');
    //   }
    // })

  }


  listWebsites(){
    this.router.navigate(['/builder/viewWebSites']);
  }
  

}

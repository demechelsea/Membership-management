import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GrapesConfigService } from 'app/website-builder/services/grapes.config.service';
import { WebsiteThemeFactory } from 'app/website-builder/services/website.theme.factory';
import { WebsiteThemeService } from 'app/website-builder/services/website.theme.service.';
import grapesjs from 'grapesjs';
import BasicBlocksPlugin from 'grapesjs-blocks-basic';
import FlexyBlocksPlugin from 'grapesjs-blocks-flexbox';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuilderComponent implements OnInit, AfterViewInit {
  public editor: any = null
  public websiteThemeService: WebsiteThemeService;

  constructor(private configService: GrapesConfigService,
    private websiteThemeFactory: WebsiteThemeFactory) {
    this.websiteThemeService = this.websiteThemeFactory.getWebsiteBuilderTheme("yummy");
  }


  ngOnInit(): void {
    this.initializeGrapesJs();
  }

  ngAfterViewInit(): void { }
  ngOnDestroy() { }

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
      
      colorPicker: { appendTo: 'parent', offset: { top: 26, left: -166, } },
      plugins: [BasicBlocksPlugin, FlexyBlocksPlugin],
      pluginsOpts: {
        BasicBlocksPlugin: {},
        FlexyBlocksPlugin: {},
      },
      canvas: {
        styles: this.websiteThemeService.getStyles() ,
        scripts: this.websiteThemeService.getScripts() ,
      }
    });

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

    // this.editor.on('component:selected', () => {
    //   const selectedComponent = this.editor.getSelected();;
    //   if (selectedComponent && selectedComponent.get('tagName') === 'a') {
    //     this.editor.runCommand('show-traits');
    //   }
    // })

  }

}

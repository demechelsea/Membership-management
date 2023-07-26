import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SoraxAnimations } from 'app/common/animations/sorax-animations';
import { AppLoaderService } from 'app/common/services/app-loader.service';
import { NotificationService } from 'app/common/services/notification.service';
import { notNull } from 'app/common/utils/string-utils';
import { BaseComponent } from 'app/core/components/base/base.component';
import { ResultViewModel } from 'app/models/result-view-model';
import WebsiteInfoModel from 'app/models/website-info-model';
import { GrapesConfigService } from 'app/website-builder/services/grapes.config.service';
import { WebsiteService } from 'app/website-builder/services/website.service';
import { WebsiteThemeFactory } from 'app/website-builder/services/website.theme.factory';
import { WebsiteThemeService as websiteThemeService } from 'app/website-builder/services/website.theme.service.';
import grapesjs from 'grapesjs';
import BasicBlocksPlugin from 'grapesjs-blocks-basic';
import FlexyBlocksPlugin from 'grapesjs-blocks-flexbox';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: SoraxAnimations,
})
export class BuilderComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gjs') gjsContainer: ElementRef;

  private ngUnsubscribe$ = new Subject<void>();
  public htmlContentForCanvas: string = '';

  public editor: any = null
  public websiteThemeService: websiteThemeService;

  resultViewModel: ResultViewModel = new ResultViewModel();
  websiteInfo: WebsiteInfoModel;

  constructor(private configService: GrapesConfigService,
    private websiteThemeFactory: WebsiteThemeFactory,
    private loader: AppLoaderService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private websiteService: WebsiteService) {
    super();
  }


  ngOnInit(): void {
    this.loader.open();
    this.websiteInfo = new WebsiteInfoModel();
    this.websiteInfo.themeName = window.history.state?.selectedTheme;
    this.websiteInfo.encryptedId = window.history.state?.referenceId;

    if (notNull(this.websiteInfo.themeName)) {
      this.websiteThemeService = this.websiteThemeFactory
        .getWebsiteBuilderTheme(this.websiteInfo.themeName);
      this.initializeGrapesJs();
    } else if (notNull(this.websiteInfo.encryptedId)) {
      this.retrieveWebsiteInformation(this.websiteInfo.encryptedId);
    }
  }

  retrieveWebsiteInformation(encryptedId: string) {
    this.websiteService
      .retrieveWebsiteByIdPromise(encryptedId).then((response) => {
        Object.assign(this.resultViewModel, response);
        this.websiteInfo = this.resultViewModel.result;
        Object.assign(this.messages, response);
        this.websiteThemeService = this.websiteThemeFactory
          .getWebsiteBuilderTheme(this.websiteInfo.themeName);
        this.initializeGrapesJs();
      });
  }

  ngAfterViewInit(): void {

  }


  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private initializeGrapesJs() {
    console.log('Inside grapes js');
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '700px',
      width: 'auto',
      storageManager: false,
      selectorManager: {
        appendTo: ".classes-container",
        componentFirst: true,
      },
      panels: { defaults: [] },
      traitManager: this.configService.getTraitManager(),
      blockManager: this.configService.getBlockManager(),
      styleManager: this.configService.getStyleSelectors(),
      layerManager: this.configService.getLayerManager(),
      assetManager: this.configService.getAssetManager(),
      colorPicker: { appendTo: 'parent', offset: { top: 26, left: -166, } },
      plugins: [BasicBlocksPlugin, FlexyBlocksPlugin],
      pluginsOpts: {
        BasicBlocksPlugin: {},
        FlexyBlocksPlugin: {},
      },
      canvas: {
        styles: this.websiteThemeService.getStyles(),
        scripts: this.websiteThemeService.getScripts(),
      },
    });

    this.websiteThemeService.addPrebuitBlocks(this.editor);
    this.configService.addEventsAndPanels(this.editor);

    this.loadJavaScripts();

    this.loadHtmlContent();

    this.loader.close();
  }

  private loadJavaScripts() {
    if (this.websiteThemeService.canLoadJavaScripts()) {
      this.editor.on('load', () => {
        const canvasWindow = this.editor.Canvas.getWindow();
        setTimeout(() => {
          if (canvasWindow.document.readyState === 'complete') {
            canvasWindow.loadFromGrapesJS();
          }
        }, 1000);
      });
    }
  }

  private loadHtmlContent() {
    if (notNull(this.websiteInfo.encryptedId)) {
      this.editor.setComponents(this.extractBodyContent(this.websiteInfo.htmlContent));
    } else {
      this.editor.setComponents(this.websiteThemeService.getHtmlContent());
    }
  }

  showWebSites() {
    this.router.navigate(['/builder/viewWebSites']);
  }

  saveChanges() {
    this.websiteInfo.status = 'Draft';
    this.websiteInfo.htmlContent = this.getFullHtml(this.editor);
    this.saveWebSiteInfo(this.websiteInfo, false);
  }

  saveAndPublish() {
    this.websiteInfo.status = 'Active';
    this.websiteInfo.htmlContent = this.getFullHtml(this.editor);
    this.saveWebSiteInfo(this.websiteInfo, true);
  }

  saveWebSiteInfo(websiteInfoModel: WebsiteInfoModel, navigate: boolean) {
    this.websiteService
      .saveWebSite(websiteInfoModel)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((response) => {
        Object.assign(this.resultViewModel, response);
        this.websiteInfo = this.resultViewModel.result;
        Object.assign(this.messages, response);

        this.notificationService.showMessages(this.messages);
        if (navigate) {
          this.router.navigate(['/builder/viewWebSites']);
        }
      });
  }


  getFullHtml(editor: any): string {
    const cssContent = editor.getCss();
    const htmlContent = editor.getHtml();
    const externalStyles = this.prepareExternalStyles();
    const externalScripts = this.prepareExternalScripts();

    const fullHtmlContent = `<!DOCTYPE html>
                                    <head>
                                        ${externalStyles}
                                      <style> ${cssContent}</style>
                                        ${externalScripts}
                                    </head> 
                                    <body>${htmlContent}</body></html>`;
    return fullHtmlContent;
  }


  prepareExternalStyles(): string {
    let externalStyles = '';
    this.websiteThemeService.getStyles().forEach((styleItem: string) => {
      externalStyles = externalStyles + `<link href="${styleItem}" rel="stylesheet">`;
    });
    return externalStyles;
  }

  prepareExternalScripts(): string {
    let externalScripts = '';
    this.websiteThemeService.getScripts().forEach((scriptItem: string) => {
      externalScripts = externalScripts + `<script src="${scriptItem}"></script>`;
    });
    return externalScripts;
  }

  extractBodyContent(htmlFullContent: string): string {
    const doc = new DOMParser().parseFromString(htmlFullContent, 'text/html');
    return doc.body.innerHTML;
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpAppDataService } from 'app/common/services/http-app-data.service';
import { splitArrayIntoGroups } from 'app/common/utils/form-utils';
import { Urls } from 'app/common/utils/urls';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrapesConfigService extends HttpAppDataService {
  
  private ngUnsubscribe$ = new Subject<void>();


  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }

  addDeviceToPanel(editor: any) {
    const deviceManager = editor.DeviceManager;
    deviceManager.add('Desktop', '1024px');
    deviceManager.add('Tablet', '575px');
    deviceManager.add('Mobile', '375px');

    editor.Panels.addPanel({
      id: 'panel-devices', 
      el: '.panel__devices',
      buttons: [{
        id: 'deviceDeskTop',
        command: 'set-device-desktop',
        className: 'fa fa-desktop',
        text: 'XL',
        attributes: { 'title': 'Extra Large' },
        active: 1
      }, {
        id: 'deviceTablet',
        command: 'set-device-tablet',
        className: 'fa fa-tablet',
        attributes: { 'title': 'Medium' }
      }, {
        id: 'deviceMobile',
        command: 'set-device-mobile',
        className: 'fa fa-mobile',
        attributes: { 'title': 'Small' }
      }]
    });

    this.addDeviceCommands(editor);
  }

  private addDeviceCommands(editor: any) {
    const commands = editor.Commands;
    commands.add('set-device-desktop', {
      run: editor => editor.setDevice('Desktop')
    });
    commands.add('set-device-tablet', {
      run: editor => editor.setDevice('Tablet')
    });
    commands.add('set-device-mobile', {
      run: editor => editor.setDevice('Mobile')
    });
  }

  addRightSidePanel(editor: any) {
    editor.Panels.addPanel({
      id: 'rightSidePanelId',
      el: '.panel__right',
      resizable: {
        maxDim: 350,
        minDim: 200,
        tc: 0, // Top handler
        cl: 1, // Left handler
        cr: 0, // Right handler
        bc: 0, // Bottom handler
        keyWidth: 'flex-basis',
      },
    });
  }

  getBlockManager(): any {
    return {
      appendTo: '.blocks-container'
    };
  }

  getLayerManager():any{
    return {
      appendTo: '.layers-container'
    };
  }

  getTraitManager():any{
    return {
      appendTo: '.traits-container',
    };
  }

  getAssetManager():any{
    return {
      assets :this.fetchAllImages(),
      uploadFile: (evnt) => { 
        this.startUploadInBatches(evnt);
      }
    };
  }
  fetchAllImages() {
    this.postData(Urls.WEBSITE_IMAGE_LIST, {}).pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(
      (response) => {
        

      });
    

    return [
      'http://localhost/actta/assets/img/hero-img.jpg',
      'http://localhost/actta/assets/img/gallery/3.jpg',
      'http://localhost/actta/assets/img/gallery/6.jpg',
      'http://localhost/actta/assets/img/gallery/1.jpg'
    ];
  }
  startUploadInBatches(e: any) {
    let files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    let batchOfFiles =  splitArrayIntoGroups(files, 2);
    for (let i = 0; i < batchOfFiles.length; i++) {
        this.uploadImages(batchOfFiles[i]);
    }
  }


  uploadImages(files: any){
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
      
    }
    this.postData(Urls.WEBSITE_IMAGE_UPLOAD, formData).pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(
      (response) => {
        console.log("Good come here, uploaded images");
      });
  }

  assetManagerEvents(editor:any){
    const assetManager = editor.AssetManager;

    editor.on('asset:upload:start', () => {
      console.log('Upload started...');
    });
    
    editor.on('asset:upload:end', () => {
      console.log('Upload end...');
    });
    
    editor.on('asset:upload:error', (err) => {
      console.log('Upload error...');
    });
    
    editor.on('asset:upload:response', (response) => {
      console.log('Upload response...');
    });
  }

  getStyleSelectors(): any {
    return {
      appendTo: ".styles-container",
      sectors: [
       {
          name: "Basic",
          open: false,
          buildProps: [
            "background",
            "background-image",
            "background-color",
            "background-size",
            "background-repeat",
            "background-position",
            "font-family",
            "color",
            "font-size",
            "font-weight",
            "letter-spacing",
            // "border",
            "border-color",
            "border-style",
            "border-width",
            'margin', 
            'padding', 
          ],
        },{
        name: 'General',
        properties: [
          {
            extend: 'float',
            type: 'radio',
            default: 'none',
            options: [
              { value: 'none', className: 'fa fa-times' },
              { value: 'left', className: 'fa fa-align-left' },
              { value: 'right', className: 'fa fa-align-right' }
            ],
          },
          'display',
          { extend: 'position', type: 'select' },
          'top',
          'right',
          'left',
          'bottom',
        ],
      }, {
        name: 'Dimension',
        open: false,
        properties: [
          'width',
          {
            id: 'flex-width',
            type: 'integer',
            name: 'Width',
            units: ['px', '%'],
            property: 'flex-basis',
            toRequire: 1,
          },
          'height',
          'max-width',
          'min-height',
          'margin',
          'padding'
        ],
      }, {
        name: 'Typography',
        open: false,
        properties: [
          'font-family',
          'font-size',
          'font-weight',
          'letter-spacing',
          'color',
          'line-height',
          {
            extend: 'text-align',
            options: [
              { id: 'left', label: 'Left', className: 'fa fa-align-left' },
              { id: 'center', label: 'Center', className: 'fa fa-align-center' },
              { id: 'right', label: 'Right', className: 'fa fa-align-right' },
              { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' }
            ],
          },
          {
            property: 'text-decoration',
            type: 'radio',
            default: 'none',
            options: [
              { id: 'none', label: 'None', className: 'fa fa-times' },
              { id: 'underline', label: 'underline', className: 'fa fa-underline' },
              { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' }
            ],
          },
          'text-shadow'
        ],
      }, {
        name: 'Decorations',
        open: false,
        properties: [
          'opacity',
          'border-radius',
          'border',
          'box-shadow',
          'background', // { id: 'background-bg', property: 'background', type: 'bg' }
        ],
      }, {
        name: 'Extra',
        open: false,
        buildProps: [
          'transition',
          'perspective',
          'transform'
        ],
      }, {
        name: 'Flex',
        open: false,
        properties: [{
          name: 'Flex Container',
          property: 'display',
          type: 'select',
          defaults: 'block',
          list: [
            { value: 'block', name: 'Disable' },
            { value: 'flex', name: 'Enable' }
          ],
        }, {
          name: 'Flex Parent',
          property: 'label-parent-flex',
          type: 'integer',
        }, {
          name: 'Direction',
          property: 'flex-direction',
          type: 'radio',
          defaults: 'row',
          list: [{
            value: 'row',
            name: 'Row',
            className: 'icons-flex icon-dir-row',
            title: 'Row',
          }, {
            value: 'row-reverse',
            name: 'Row reverse',
            className: 'icons-flex icon-dir-row-rev',
            title: 'Row reverse',
          }, {
            value: 'column',
            name: 'Column',
            title: 'Column',
            className: 'icons-flex icon-dir-col',
          }, {
            value: 'column-reverse',
            name: 'Column reverse',
            title: 'Column reverse',
            className: 'icons-flex icon-dir-col-rev',
          }],
        }, {
          name: 'Justify',
          property: 'justify-content',
          type: 'radio',
          defaults: 'flex-start',
          list: [{
            value: 'flex-start',
            className: 'icons-flex icon-just-start',
            title: 'Start',
          }, {
            value: 'flex-end',
            title: 'End',
            className: 'icons-flex icon-just-end',
          }, {
            value: 'space-between',
            title: 'Space between',
            className: 'icons-flex icon-just-sp-bet',
          }, {
            value: 'space-around',
            title: 'Space around',
            className: 'icons-flex icon-just-sp-ar',
          }, {
            value: 'center',
            title: 'Center',
            className: 'icons-flex icon-just-sp-cent',
          }],
        }, {
          name: 'Align',
          property: 'align-items',
          type: 'radio',
          defaults: 'center',
          list: [{
            value: 'flex-start',
            title: 'Start',
            className: 'icons-flex icon-al-start',
          }, {
            value: 'flex-end',
            title: 'End',
            className: 'icons-flex icon-al-end',
          }, {
            value: 'stretch',
            title: 'Stretch',
            className: 'icons-flex icon-al-str',
          }, {
            value: 'center',
            title: 'Center',
            className: 'icons-flex icon-al-center',
          }],
        }, {
          name: 'Flex Children',
          property: 'label-parent-flex',
          type: 'integer',
        }, {
          name: 'Order',
          property: 'order',
          type: 'integer',
          defaults: 0,
          min: 0
        }, {
          name: 'Flex',
          property: 'flex',
          type: 'composite',
          properties: [{
            name: 'Grow',
            property: 'flex-grow',
            type: 'integer',
            defaults: 0,
            min: 0
          }, {
            name: 'Shrink',
            property: 'flex-shrink',
            type: 'integer',
            defaults: 0,
            min: 0
          }, {
            name: 'Basis',
            property: 'flex-basis',
            type: 'integer',
            units: ['px', '%', ''],
            unit: '',
            defaults: 'auto',
          }],
        }, {
          name: 'Align',
          property: 'align-self',
          type: 'radio',
          defaults: 'auto',
          list: [{
            value: 'auto',
            name: 'Auto',
          }, {
            value: 'flex-start',
            title: 'Start',
            className: 'icons-flex icon-al-start',
          }, {
            value: 'flex-end',
            title: 'End',
            className: 'icons-flex icon-al-end',
          }, {
            value: 'stretch',
            title: 'Stretch',
            className: 'icons-flex icon-al-str',
          }, {
            value: 'center',
            title: 'Center',
            className: 'icons-flex icon-al-center',
          }],
        }]
      }
      ]
    };
  }

  addButtonsToRightPanel(editor: any) {
    const panelManager = editor.Panels;

    var newPanel = panelManager.addPanel({
      id: 'panel__switcher',
      el: '.panel__switcher',
      buttons: [
        {
          id: "clean-all",
          className: "fa fa-trash ",
          command: "core:canvas-clear",
          attributes: { title: "Empty canvas" },
        },
        {
          id: "select",
          className: "fa fa-dashcube ",
          command: "sw-visibility",
          context: "core:component-select",
          attributes: { title: "Select element" },
        },
        {
          id: "undo",
          className: "fa fa-undo",
          command: "core:undo",
          attributes: { title: "Undo (CTRL/CMD + Z)" },
        },
        {
          id: "redo",
          className: "fa fa-repeat",
          command: "core:redo",
          attributes: { title: "Redo (CTRL/CMD + SHIFT + Z)" },
        },
        {
          id: "images",
          className: "fa fa-picture-o",
          command: "open-assset-manager",
          attributes: { title: "Add Images" },
        },
        {
          id: 'show-blocks',
          active: true,
          className: 'fa fa-th-large',
          command: 'show-blocks',
          // Once activated disable the possibility to turn it off
          togglable: true,
        }, {
          id: 'show-layers',
          active: true,
          className: 'fa fa-bars',
          command: 'show-layers',
          // Once activated disable the possibility to turn it off
          togglable: true,
        }, {
          id: 'show-style',
          active: true,
          className: 'fa fa-paint-brush',
          command: 'show-style',
          togglable: true,
          attributes: { title: "Open Style Manager" },
        },
        {
          id: 'show-traits',
          active: true,
          className: 'fa fa-cog',
          command: 'show-traits',
          togglable: true,
        }
      ],
    });

    editor.Commands.add('show-blocks', this.createShowHideCommand('.blocks-container'));
    editor.Commands.add('show-layers', this.createShowHideCommand('.layers-container'));
    editor.Commands.add('show-style', this.createShowHideCommand('.styles-container'));
    editor.Commands.add('show-traits', this.createShowHideCommand('.traits-container'));
  }


  private createShowHideCommand(containerSelector) {
    return {
      getRowEl(editor) {
        return editor.getContainer().closest('.editor-row');
      },
      getContainerEl(row) {
        return row.querySelector(containerSelector);
      },
      run(editor) {
        const row = this.getRowEl(editor);
        const container = this.getContainerEl(row);
        container.style.display = '';
      },
      stop(editor) {
        const row = this.getRowEl(editor);
        const container = this.getContainerEl(row);
        container.style.display = 'none';
      },
    };
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
import { Component } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  constructor() {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      fileItem.progress = progress;
      console.log(`File "${fileItem.file.name}" progress: ${progress}%`);
    };

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => this.response = res);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppLoaderComponent } from 'app/common/components/app-loader/app-loader.component';
import { AppModule } from 'app/app.module';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';

interface Config {
  width?: string,
}

@Injectable({ providedIn: "root" })
export class AppLoaderService {
  dialogRef: MatDialogRef<AppLoaderComponent>;
  component: any;
  constructor(private dialog: MatDialog) { }

  public open(title: string = 'Please wait',
    config: Config = { width: '200px' }): Observable<boolean> {
    this.dialogRef = this.dialog.open(AppLoaderComponent,
      {
        disableClose: true,
        backdropClass: 'light-backdropc',
        panelClass: 'loader-modalbox'
      });
    this.dialogRef.updateSize(config.width);
    this.dialogRef.componentInstance.title = title;
    return this.dialogRef.afterClosed();
  }

  public setComponents(components: any) {
    this.component = components;
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    if (Array.isArray(this.component)) {
      this.component.forEach((compObject) => {
        this.clearComponents(compObject)
      });
    } else if (this.component) {
      this.clearComponents(this.component);
    }

  }

  clearComponents(componnetObj: any) {
    if (componnetObj instanceof MatProgressBar) {
      componnetObj.mode = 'determinate';
    } else if (componnetObj instanceof MatButton) {
      componnetObj.disabled = false;
    }
  }
}

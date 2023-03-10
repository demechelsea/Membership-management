import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppLoaderComponent } from 'app/common/components/app-loader/app-loader.component';
import { AppModule } from 'app/app.module';

interface Config {
  width?: string,
}

@Injectable({ providedIn: "root" })
export class AppLoaderService {
  dialogRef: MatDialogRef<AppLoaderComponent>;
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

  public close() {
    if (this.dialogRef)
      this.dialogRef.close();
  }
}

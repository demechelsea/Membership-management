import { Injectable } from '@angular/core';
import { WebsiteThemeService } from './website.theme.service.';
import { environment } from 'environments/environment';
import { AssociationModel } from 'app/models/association-model';

@Injectable({
  providedIn: 'root'
})
export class PlainThemeServiceImpl implements WebsiteThemeService {
  private blockCategory: string = 'Prebuild Sections';

  private websiteBaseUrl: string;
  private themeUrl: string;


  constructor(private assoicjation: AssociationModel) {
    this.websiteBaseUrl = environment.cdnURL + "/" + this.assoicjation.soceityRaxUrl;
    this.themeUrl = environment.cdnURL + "/plaintheme";
  }

  addPrebuitBlocks(editor: any): void {
    this.addNavbarBlock(editor);
    this.addHomePageBlock(editor);
    this.addAboutUsBlock(editor);
    this.addMembershipBlock(editor);
    this.addEventsBlock(editor);
    this.addCommitteeBlock(editor);
    this.addDonorsBlock(editor);
    this.addContactUsBlock(editor);
    this.addFooterBlock(editor);
  }

  getStyles(): string[] {

    return [ ];
  }
  getScripts(): string[] {
    return [];
  }

  getMediaIcon(name: string, width:number = 60) {
    return ``;
  }

  getNavbarSectionHTML(): string {
    return ` `;
  }

  addNavbarBlock(editor: any): void {}

  getHomeSectionHTML(): string {
    return ``;
  }
  addHomePageBlock(editor: any): void {}

  getAboutUsSectionHTML(): string {
   return ``;
  }
  addAboutUsBlock(editor: any): void {}

  getMembershipSectionHTML():string {
    return ``;
  }

  addMembershipBlock(editor: any): void {}

  getEventsSectionHTML():string{
    return ``;
  }

  addEventsBlock(editor: any): void {}

  getCommitteeSectionHTML():string {
    return ``;
  }

  addCommitteeBlock(editor: any): void {
  }

  getSponsorSectionHTML() :string{
    return ``;
  }

  addSponsorsBlock(editor: any): void {}

  getDonorsSectionHTML():string {
    return ``;
  }
  addDonorsBlock(editor: any): void {}

  getContactUsSectionHTML() :string{
    return ``;
  }
  addContactUsBlock(editor: any): void {}

  getFooterSectionHTML():string {
    return ``;
  }

  addFooterBlock(editor: any): void {}

  getHtmlContent(): string {
    return this.getNavbarSectionHTML()
      + this.getHomeSectionHTML()
      + this.getAboutUsSectionHTML()
      + this.getMembershipSectionHTML()
      + this.getEventsSectionHTML()
      + this.getCommitteeSectionHTML()
      + this.getSponsorSectionHTML()
      + this.getDonorsSectionHTML()
      + this.getContactUsSectionHTML()
      + this.getFooterSectionHTML();
  }

  canLoadJavaScripts(): boolean {
    return false;
  }

}

export interface WebsiteThemeService {
  
  canLoadJavaScripts():boolean;
  getStyles(): string[];
  getScripts(): string[];
  addPrebuitBlocks(editor:any):void
  addNavbarBlock(editor: any): void;
  addHomePageBlock(editor: any): void;
  addAboutUsBlock(editor: any): void;
  addMembershipBlock(editor: any): void;
  addEventsBlock(editor: any): void;
  addCommitteeBlock(editor: any): void;
  addSponsorsBlock(editor: any): void;
  addDonorsBlock(editor: any): void;
  addContactUsBlock(editor: any): void;
  addFooterBlock(editor: any): void;
  getHtmlContent():string;
}

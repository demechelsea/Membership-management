export class Constants {
  public ALPHAS:string = "[A-Za-z]+";
  public NUMBERS_ONLY:string = '[0-9]+';
  public ALPHA_NUMERIC:string = "[A-Za-z0-9]+";

  public PHONE_NUMBER:string = '[0-9\(\)-+ ]+';
  public NAME_TEXT:string = "[A-Za-z0-9\-'& ]+";

  //accept all characters except specified in brackets
  public GENERAL_TEXT:string = "[^{}<>~`^]+";


}
 
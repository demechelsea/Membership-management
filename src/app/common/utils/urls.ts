import { environment } from 'environments/environment';

export class Urls {
     public static baseAPIUrl: string = environment.apiURL;
     public static contextPath: string = "";
     public static LOGIN_URL: string = Urls.baseAPIUrl + "/authenticate/login";
     public static REGISTER_ASSOCIATION: string = Urls.baseAPIUrl + Urls.contextPath + "/authenticate/registerAssociation";
     
     public static REGISTER_USER: string = Urls.baseAPIUrl + Urls.contextPath + "/authenticate/registerUser";
     public static VERIFY_EMAIL: string = Urls.baseAPIUrl + Urls.contextPath + "/authenticate/verifyEmailPhone";
     public static CHANGE_PASSWORD: string = Urls.baseAPIUrl + Urls.contextPath + "/authenticate/changePassword";
     public static SEND_OTP_PASSWORD: string = Urls.baseAPIUrl + Urls.contextPath + "/authenticate/sendOTPForPasswordChange";
     public static RESEND_OTP_PASSWORD: string = Urls.baseAPIUrl + Urls.contextPath + "/authenticate/reSendOTPForPasswordChange";
     public static SECURITY_REFRESH_TOKEN: string = "/authenticate/refreshAuthToken";

     public static CREATE_EMPLOYEE: string = Urls.baseAPIUrl + Urls.contextPath + "/employee/createEmployee";
     public static EMPLOYEE_VIEW_ALL: string = Urls.baseAPIUrl + Urls.contextPath + "/employee/retrieveEmployees";

     public static MEMBERSHIP_PLAN_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listMembershipPlans";
     public static MEMBERSHIP_NEW_PLAN_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listMembershipPlansNew";

     public static MEMBERSHIP_PLAN_VIEW: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/viewMembershipPlan";
     public static MEMBERSHIP_PLAN_CREATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createMembershipPlan";
     public static MEMBERSHIP_PLAN_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateMembershipPlan";

     public static COMMON_LOOKUP_SERVICE: string = Urls.baseAPIUrl + Urls.contextPath + "/common/lookupService";

     public static APPLICATIONS = [{name:"SOCIETYRAX_APP"}];
     
     public static TITLES = [
          { viewValue: "Mr", value: "Mr" },
          { viewValue: "Mrs", value: "Mrs" },
          { viewValue: "Ms", value: "Ms" },
          { viewValue: "Jr", value: "Jr" },
          { viewValue: "Dr", value: "Dr" },
          { viewValue: "Hon", value: "Honorable" },
     ];
     public static GENDERS = [
          { viewValue: "Male", value: "Male" },
          { viewValue: "Female", value: "Femal" },
          { viewValue: "Other", value: "Other" },
     ];

}

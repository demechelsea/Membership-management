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
     public static FETCH_ASSOC_BY_CONTEXTPATH: string = Urls.baseAPIUrl + Urls.contextPath + "/authenticate/retrieveAssoication";
     public static RETRIEVE_MEMBER_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath  + "/authenticate/retrieveMembersByAssociation"
     
     public static COMMON_LOOKUP_SERVICE: string = Urls.baseAPIUrl + Urls.contextPath + "/common/lookupService";
     public static MEMBERSHIP_PLAN_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listMembershipPlans";
     public static MEMBERSHIP_NEW_PLAN_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listMembershipPlansNew";

     public static MEMBERSHIP_PLAN_VIEW: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/viewMembershipPlan";
     public static MEMBERSHIP_PLAN_CREATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createMembershipPlan";
     public static MEMBERSHIP_PLAN_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateMembershipPlan";
     public static MEMBERSHIP_PLAN_DELETE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteMembershipPlan";

     public static COMMITTEE_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listCommittees";
     //public static COMMITTEE_NEW_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listCommitteeNew";
     public static RETRIEVE_COMMITTEE_BY_ID: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/retrieveCommitteeById";
     public static RETRIEVE_COMMITTEE_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath  + "/associationSettings/retrieveCommitteeByAssoc";
     

     //public static COMMITTEE_VIEW: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/viewCommittee";
     public static COMMITTEE_CREATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createCommittee";
     public static COMMITTEE_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateCommittee";
     public static COMMITTEE_DELETE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteCommittee";


     public static COMMITTEE_MEMBER_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listCommitteeMemberCommittee";
     public static REGISTER_COMMITTEE_MEMBER: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createCommitteeMember";
     public static UPDATE_COMMITTEE_MEMBER : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateCommitteeMember";
     public static DELETE_COMMITTEE_MEMBER: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteCommitteeMember";
     public static COMMITTEE_MEMBER_LIST_BY_COMMITTEE : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listCommitteeMemberCommittee";
     public static RETRIEVE_COMMITTEE_MEMBER_BY_ID : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/retrieveCommitteeMemberById";

     
     public static POSITION_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listCommitteePositionsBYCommittee";
     //public static POSITION_NEW_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listPositionNew";

     public static POSITION_VIEW: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/viewPosition";
     public static POSITION_CREATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createCommitteePosition";
     public static POSITION_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateCommitteePosition";
     public static POSITION_DELETE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteCommitteePosition";


     public static COMMITTEE_DOCSTORE_BY_ID: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/retrieveCommitteeDocById";
     public static COMMITTEE_DOCSTORE_BY_COMMITTEE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/retrieveCommitteeDocsByCommittee";
     public static REGISTER_COMMITTEE_DOCSTORE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createCommitteeDocstore";
     public static UPDATE_COMMITTEE_DOCSTORE : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateCommitteeDocstore";
     public static DELETE_COMMITTEE_DOCSTORE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteCommitteeDocstore";


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

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
     public static RETRIEVE_MEMBER_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath + "/authenticate/retrieveMembersByAssociation"

     public static COMMON_LOOKUP_SERVICE: string = Urls.baseAPIUrl + Urls.contextPath + "/common/lookupService";
     public static MEMBERSHIP_PLAN_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listMembershipPlans";
     public static MEMBERSHIP_NEW_PLAN_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listMembershipPlansNew";

     public static MEMBERSHIP_PLAN_VIEW: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/viewMembershipPlan";
     public static MEMBERSHIP_PLAN_CREATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createMembershipPlan";
     public static MEMBERSHIP_PLAN_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateMembershipPlan";
     public static MEMBERSHIP_PLAN_DELETE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteMembershipPlan";

     public static COMMITTEE_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listCommittees";
     public static RETRIEVE_COMMITTEE_BY_ID: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/retrieveCommitteeById";
     public static RETRIEVE_COMMITTEE_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/retrieveCommitteeByAssoc";


     public static COMMITTEE_CREATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createCommittee";
     public static COMMITTEE_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateCommittee";
     public static COMMITTEE_DELETE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteCommittee";


     public static COMMITTEE_MEMBER_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listCommitteeMemberCommittee";
     public static REGISTER_COMMITTEE_MEMBER: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createCommitteeMember";
     public static UPDATE_COMMITTEE_MEMBER: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateCommitteeMember";
     public static DELETE_COMMITTEE_MEMBER: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteCommitteeMember";
     public static COMMITTEE_MEMBER_LIST_BY_COMMITTEE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listCommitteeMemberCommittee";
     public static RETRIEVE_COMMITTEE_MEMBER_BY_ID: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/retrieveCommitteeMemberById";


     public static POSITION_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/listCommitteePositionsBYCommittee";
     public static POSITION_VIEW: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/viewPosition";
     public static POSITION_CREATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createCommitteePosition";
     public static POSITION_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateCommitteePosition";
     public static POSITION_DELETE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteCommitteePosition";


     public static COMMITTEE_DOCSTORE_BY_ID: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/retrieveCommitteeDocById";
     public static COMMITTEE_DOCSTORE_BY_COMMITTEE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/retrieveCommitteeDocsByCommittee";
     public static REGISTER_COMMITTEE_DOCSTORE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/createCommitteeDocstore";
     public static UPDATE_COMMITTEE_DOCSTORE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateCommitteeDocstore";
     public static DELETE_COMMITTEE_DOCSTORE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/deleteCommitteeDocstore";

     public static EMAIL_SETTINGS_REGISTER: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/emailSettingRegister";
     public static EMAIL_SETTINGS_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/retrieveEmailSettingByAssoc";
     public static EMAIL_SETTINGS_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/emailSettingUpdate";

     public static EMAIL_TEMPLATE_REGISTER: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/emailTemplateRegister";
     public static EMAIL_TEMPLATE_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/retrieveEmailTemplateByAssoc";
     public static EMAIL_TEMPLATE_BY_ID: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/retrieveEmailTemplateById";
     public static EMAIL_TEMPLATE_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/emailTemplateUpdate";
     public static EMAIL_TEMPLATE_DELETE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/emailTemplateDelete";

     public static EMAIL_HISTORY_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/retrieveEmlHistoryByAssoc";
     public static EMAIL_HISTORY_BY_ID: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/retrieveEmlHistoryById";

     public static MSG_SETTINGS_REGISTER : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/msgSettingRegister";
     public static MSG_SETTINGS_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/retrieveMsgSettingByAssoc";
     public static MSG_SETTINGS_UPDATE : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/msgSettingUpdate";

     public static MSG_TEMPLATE_REGISTER  : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/msgTemplateRegister";
     public static MSG_TEMPLATE_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/retrieveMsgTemplateByAssoc";
     public static MSG_TEMPLATE_BY_ID : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/retrieveMsgTemplateById";
     public static MSG_TEMPLATE_UPDATE  : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/msgTemplateUpdate";
     public static MSG_TEMPLATE_DELETE  : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/msgTemplateDelete";

     public static MSG_HISTORY_REGISTER   : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/msgHistoryRegister";
     public static MSG_HISTORY_BY_ASSOC  : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/retrieveMsgHistoryByAssoc";
     public static MSG_HISTORY_BY_ID   : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/retrieveMsgHistoryById";


     public static MSG_SUBSCRIPTION_REGISTER   : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/msgSubscriptionRegister";
     public static MSG_SUBSCRIPTION_BY_ASSOC   : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/retrieveMsgSubscriptionByAssoc";
     public static MSG_SUBSCRIPTION_BY_ID   : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/retrieveMsgSubscriptionById";
     public static MSG_UNSUBSCRIBED_ALL   : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/retrieveMsgUnsubscribed";
     public static MSG_SUBSCRIPTION_UPDATE   : string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/sms/msgSubscriptionUpdate";
   

     public static EMAIL_SUBSCRIPTION_REGISTER: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/emlSubscriptionRegister";
     public static EMAIL_SUBSCRIPTION_BY_ASSOC: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/retrieveEmlSubscriptionByAssoc";
     public static EMAIL_SUBSCRIPTION_BY_ID: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/retrieveEmlSubscriptionById";
     public static EMAIL_UNSUBSCRIBED_ALL: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/retrieveEmlUnsubscribed";
     public static EMAIL_SUBSCRIPTION_UPDATE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/email/emlSubscriptionUpdate";

     public static WEBSITE_IMAGE_UPLOAD: string = Urls.baseAPIUrl + Urls.contextPath + "/upload/imageUpload";
     public static WEBSITE_IMAGE_LIST: string = Urls.baseAPIUrl + Urls.contextPath + "/upload/listAllImages";

     public static ASSOC_DOCSTORE_BY_ID: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/policy/retrieveAssocDocById";
     public static ASSOC_DOCSTORE_BY_ASSOCATION: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/policy/retrieveAssocDocsByAssoc";
     public static GET_ASSOC_DOCSTORE_BY_LINK: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/policy/retrieveAssocDocByLink";
     public static REGISTER_ASSOC_DOCSTORE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/policy/createAssocDocstore";
     public static UPDATE_ASSOC_DOCSTORE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/policy/updateAssocDocstore";
     public static DELETE_ASSOC_DOCSTORE: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/policy/deleteAssocDocstore";
    
    
     public static GET_USER_ROLES_AND_PERMISSIONS: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/getUserRolesAndPermissions";
     public static UPDATE_USER_ROLES_AND_PERMISSIONS: string = Urls.baseAPIUrl + Urls.contextPath + "/associationSettings/updateUserRolesAndPermissions";


     public static APPLICATIONS = [{ name: "SOCIETYRAX_APP" }];

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

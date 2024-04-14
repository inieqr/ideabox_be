"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaTags = exports.LikeAction = exports.NotificationType = exports.Gender = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
})(Role || (exports.Role = Role = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Genderfluid"] = "genderfluid";
    Gender["Genderqueer"] = "genderqueer";
    Gender["Cisgender"] = "cisgender";
    Gender["Rather_not_say"] = "rather_not_say";
})(Gender || (exports.Gender = Gender = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["ORDINARY_USER_CREATED"] = "ordinary_user_created";
    NotificationType["ORDINARY_USER_LOGGED_IN"] = "ordinary_user_logged_in";
    NotificationType["ORDINARY_USER_DELETED"] = "ordinary_user_deleted";
    NotificationType["ORDINARY_USER_PASSWORD_CHANGED"] = "ordinary_user_password_changed";
    NotificationType["COMMENT_MADE"] = "comment_made";
    NotificationType["COMMENT_DELETED"] = "comment_deleted";
    NotificationType["COMMENT_EDITED"] = "comment_edited";
    NotificationType["REPLIED_A_COMMENT"] = "replied_a_comment";
    NotificationType["REPLY_DELETED"] = "reply_deleted";
    NotificationType["REPLY_EDITED"] = "reply_edited";
    NotificationType["EMAIL_VERIFICATION"] = "email_verification";
    NotificationType["BLOGPOST_CREATED"] = "blogpost_created";
    NotificationType["BLOGPOST_EDITED"] = "blogpost_edited";
    NotificationType["BLOGPOST_DELETED"] = "blogpost_deleted";
    NotificationType["ADMIN_CREATED"] = "admin_created";
    NotificationType["ADMIN_PASSWORD_CHANGED"] = "admin_password_changed";
    NotificationType["LIKED_A_POST"] = "liked_a_post";
    NotificationType["LIKED_A_COMMENT"] = "liked_a_comment";
    NotificationType["LIKED_A_REPLY"] = "liked_a_reply";
    NotificationType["LOGGED_IN"] = "logged_in";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var LikeAction;
(function (LikeAction) {
    LikeAction["LIKE"] = "like";
})(LikeAction || (exports.LikeAction = LikeAction = {}));
var IdeaTags;
(function (IdeaTags) {
    IdeaTags["BUSINESS"] = "Business";
    IdeaTags["INVENTIONS"] = "Inventions";
    IdeaTags["TECHNOLOGY"] = "Technology";
    IdeaTags["EDUCATION"] = "Education";
    IdeaTags["ATIFCIAL_INTELLIGENCE"] = "Artificial_Intelligence";
    IdeaTags["SOFTWARE"] = "Software";
})(IdeaTags || (exports.IdeaTags = IdeaTags = {}));
//# sourceMappingURL=general.enum.js.map
// In your websites configuration file
var website = `src/pages/modules/websiteModule/`
var admin = `src/pages/modules/adminModule/`
var user = `src/pages/modules/userModule/`
var associate = `src/pages/modules/associateModule/`
var common = `src/pages/modules/commonModule/`

const path = require("path")
const web_websites = [
  {
    path: "/admissions",
    component: path.resolve(website + `Admissions/index.js`),
  },

  {
    path: "/application-creation-success",
    component: path.resolve(website + `applicationCreatedSuccessfully.js`),
  },
  {
    path: "/complete-package",
    component: path.resolve(website + `CompletePackageRegistration.js`),
  },
  {
    path: "/admissions/cv-resume",
    component: path.resolve(website + `Admissions/cv-resume.js`),
  },
  {
    path: "/admissions/essays",
    component: path.resolve(website + `Admissions/essays.js`),
  },
  { path: "/careers", component: path.resolve(website + `Careers/index.js`) },
  {
    path: "/careers/cv-resume",
    component: path.resolve(website + `Careers/cv-resume.js`),
  },
  {
    path: "/careers/essays",
    component: path.resolve(website + `Careers/essays.js`),
  },
  {
    path: "/scholarships",
    component: path.resolve(website + `Scholarships/index.js`),
  },
  {
    path: "/scholarships/cv-resume",
    component: path.resolve(website + `Scholarships/cv-resume.js`),
  },
  {
    path: "/scholarships/essays",
    component: path.resolve(website + `Scholarships/essays.js`),
  },
  { path: "/about-us", component: path.resolve(website + `/about-us.js`) },
  { path: "/blog", component: path.resolve(website + `/blog.js`) },
  { path: "/contact", component: path.resolve(website + `/contact.js`) },
  { path: "/cart", component: path.resolve(website + `/cart.js`) },
  {
    path: "/checkout",
    component: path.resolve(website + `components/checkout.js`),
  },
  {
    path: "/auth.user",
    component: path.resolve(website + `components/authenticate.user.js`),
  },
  {
    path: "/request-associate-service",
    component: path.resolve(website + `request-associate-service.js`),
  },
  {
    path: "/associate-registration",
    component: path.resolve(website + `associateRegistration.js`),
  },
  {
    path: "/registration-successful",
    component: path.resolve(website + `registrationSuccessful.js`),
  },
]


const admin_routes = [
  {
    path: "/admin/account/new-application",
    component: path.resolve(admin + `index.js`),
  },
  {
    path: "/admin/account/awaiting-approval",
    component: path.resolve(admin + `components/awaitingApproval.js`),
  },
  {
    path: "/admin/account/assigned-application",
    component: path.resolve(admin + `components/assignApplication.js`),
  },
  {
    path: "/admin/account/in-progress-application",
    component: path.resolve(admin + `components/inProgressApplication.js`),
  },
  {
    path: "/admin/account/completed-application",
    component: path.resolve(admin + `components/completedApplication.js`),
  },
  {
    path: "/admin/account/edit-profile",
    component: path.resolve(admin + `components/editProfile.js`),
  },

  {
    path: "/admin/account/chat-room",
    component: path.resolve(admin + `components/adminChatWindow.js`),
  },
  {
    path: "/admin/account/change-password",
    component: path.resolve(admin + `components/changePassword.js`),
  },
  {
    path: "/admin/account/logout",
    component: path.resolve(admin + `components/logout.js`),
  },
  {
    path: "/admin/account/dashboard/package/details",
    component: path.resolve(admin + `components/packageDetail.js`),
  },
  {
    path: "/admin/account/dashboard/profile",
    component: path.resolve(admin + `components/adminAssociateProfile.js`),
  },
  {
    path: "/admin/account/associates",
    component: path.resolve(admin + `components/Associates.js`),
  },
]

const associate_routes = [

  {
    path: "/associate/account/new-application",
    component: path.resolve(associate + `index.js`),
  },
  {
    path: "/associate/account/awaiting-approval",
    component: path.resolve(associate + `components/awaitingApproval.js`),
  },
  {
    path: "/associate/account/assigned-application",
    component: path.resolve(associate + `components/assignApplication.js`),
  },
  {
    path: "/associate/account/in-progress-application",
    component: path.resolve(associate + `components/inProgressApplication.js`),
  },
  {
    path: "/associate/account/completed-application",
    component: path.resolve(associate + `components/completedApplication.js`),
  },
  {
    path: "/associate/account/edit-profile",
    component: path.resolve(associate + `components/editProfile.js`),
  },
  {
    path: "/associate/account/chat-room",
    component: path.resolve(associate + `components/associateChatWindow.js`),
  },
  {
    path: "/associate/account/change-password",
    component: path.resolve(associate + `components/changePassword.js`),
  },
  {
    path: "/associate/account/logout",
    component: path.resolve(associate + `components/logout.js`),
  },
  {
    path: "/associate/account/dashboard/package/details",
    component: path.resolve(associate + `components/packageDetail.js`),
  },
  {
    path: "/associate/account/dashboard/profile",
    component: path.resolve(
      associate + `components/associateAssociateProfile.js`
    ),
  },
]

const user_routes = [
  {
    path: "/user/account/dashboard",
    component: path.resolve(user + `index.js`),
  },
  {
    path: "/user/account/chat-room",
    component: path.resolve(user + `components/userChatWindow.js`),
  },
  {
    path: "/user/account/change-password",
    component: path.resolve(user + `components/changePassword.js`),
  },
  {
    path: "/user/account/edit-profile",
    component: path.resolve(user + `components/editProfile.js`),
  },
  {
    path: "/user/account/logout",
    component: path.resolve(user + `components/logout.js`),
  },
  {
    path: "/user/account/dashboard/package/details",
    component: path.resolve(user + `components/packageDetail.js`),
  },
  {
    path: "/user/account/dashboard/profile",
    component: path.resolve(user + `components/userAssociateProfile.js`),
  },
]

module.exports = [].concat(
  web_websites,
  admin_routes,
  associate_routes,
  user_routes
)
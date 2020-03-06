var environURl
var pKey;
if (process.env.NODE_ENV === "production") {
  environURl = "https://infinite-cove-53014.herokuapp.com/api/"
} else {
  environURl = "http://127.0.0.1:8000/api/"
}

if (process.env.NODE_ENV === "production") {
  pKey = "pk_live_a2e85558692cca93f4693bc3a2c7b21b78a53ace"
} else {
  pKey = "pk_test_54178ff803144d4be6b17fd55e811288d4a20ddf"
}
export const P_KEY = pKey;
export const SEND_MAIL = environURl+"sendEmail"
export const APPROVED_MAIL = environURl + "sendApprovedMail"
export const DECLINE_EMAIL = environURl + "sendDeclinedMail"
export const APPLICATION_ASSIGNED = environURl + "applicationAssigned"
export const CLIENT_PASSWORD =
         environURl + "clientPassword"
export const APPLICATION_REVIEW = environURl + "applicationReview"
export const PASSWORD_CHANGE = environURl + "changePassword"
export const PASSWORD_RESET = environURl + "resetForgottenPassword"
export const SAVE_RESET_PASSWORD = environURl + "saveResetPassword"
export const SAVE_PROFILE_IMAGE = environURl + "saveProfileImage"
export const PROFILE_IMAGE_REF = environURl + "getExpertProfileImageRef"
export const EXPERT_AVERAGE_RATING = environURl + "expertAverageRating"
export const UPDATE_PROFILE_IMAGE =
         environURl + "updateProfileImage"
export const SAVE_CLIENT_DETAILS = environURl + "saveClientDetail"
export const SAVE_EXPERT_DETAILS = environURl + "saveExpertDetail"
export const UPDATE_EXPERT_DETAILS = environURl + "updateExpertDetail"
export const EXPERT_DETAIL = environURl + "expertDetail"
export const EXPERT_INFO = environURl + "expertInfo"
export const GET_EMAIL = environURl +"getEmail"
export const SEND_ASSOCIATE_EMAIL = environURl + "sendAssociateEmail"
export const MESSAGE_MAIL = environURl + "messageNotification"

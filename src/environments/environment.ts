// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  // baseURL: 'https://visitor-sjps.southeastasia.cloudapp.azure.com/api/',
  // basedownload: 'https://visitor-sjps.southeastasia.cloudapp.azure.com/Logs/',
  // redirectSessionTimeout: "https://visitor-sjps.southeastasia.cloudapp.azure.com/Admin/#/login",
  // redirectChangePassword: "https://visitor-sjps.southeastasia.cloudapp.azure.com/Admin/#/changepassword",

  baseURL : 'http://mad-doge.ddns.net:4004/api/',
  // baseURL: 'https://bear-corp.com/sjps/api/',
  basedownload:'http://mad-doge.ddns.net:4003/Logs/',
  redirectSessionTimeout: "http://mad-doge.ddns.net:4003/#/login",
  redirectChangePassword: "http://mad-doge.ddns.net:4003/#/changepassword",
  redirectdenied: "http://mad-doge.ddns.net:4003/#/access",
  pageSizeOptions: [5, 10, 25, 50, 75]
};

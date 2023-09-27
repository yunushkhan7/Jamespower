export const environment = {
  production: true,
  //prod-links
  // baseURL: 'https://visitor-sjps.southeastasia.cloudapp.azure.com/api/',
  // basedownload: 'https://visitor-sjps.southeastasia.cloudapp.azure.com/Logs/',
  // redirectSessionTimeout: "https://sjpsonline.com/Admin/#/login",
  // redirectChangePassword: "https://sjpsonline.com/Admin/#/changepassword",

  // uat links
  baseURL : 'http://mad-doge.ddns.net:4004/api/',
  // baseURL: 'https://bear-corp.com/sjps/api/', //git
  basedownload:'http://mad-doge.ddns.net:4003/Logs/',
  redirectSessionTimeout: "http://mad-doge.ddns.net:4003/SJPSAdmin/#/login",
  redirectChangePassword: "http://mad-doge.ddns.net:4003/SJPSAdmin/#/changepassword",
  redirectdenied: "http://mad-doge.ddns.net:4003/SJPSAdmin/#/access",

  pageSizeOptions: [5, 10, 25, 50, 75]

};

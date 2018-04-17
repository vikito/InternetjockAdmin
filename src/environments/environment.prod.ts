export const environment = {
  production: true,
  getUrl: window.location,
  baseUrl: this.getUrl.protocol + '//' + this.getUrl.host + '/',
  host: this.getUrl.host, // 'template.aaadev.info'; //
  Config : {
    Api: this.baseUrl + 'api',
    ImgUrl: this.baseUrl,
    LoginUrl: '/index.html?master=login', // "/../login.html",
    HomeUrl: '/index.html'
  }
};

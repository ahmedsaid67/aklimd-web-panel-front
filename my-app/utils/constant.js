
export const API_ROUTES = {
  // Authentication and Authorization Operations
  LOGIN: "/token/",
  LOGOUT: "/logout/",
  REGISTER: '/register/',
  CHECK_TOKEN : "/check-token/",
  GET_USER : "/user-info/",
  USERS : "/users/",
  USER_DETAIL : "/users/id/",
  UPDATE_CREDIT : '/users/id/update-credit/',
  GET_PROFIL:'/users/profile/',
  RESET_PASSWORD_CODE : '/password-reset/request-reset/' ,
  RESET_PASSWORD : '/password-reset/reset-password/' ,

  // iletişim
  ILETISIM : '/iletisim/',

  CURRENT_POST :'/current-post/',
  CURRENT_POST_DETAIL :'/current-post/id/',
  CURRENT_POST_TOP10 :'/current-post/current-posts-top10',
  CURRENT_POST_FULL :'/current-post/full/',

  // araçlar
  ARACLAR : '/araclar/',
  ARAC_DETAIL :'/araclar/id/',
  ARACLAR_PAGINATED :'/araclar/araclar-paginated/',
  ARACLAR_SEARCH_FOR_CARS :'/araclar/search-for-cars/',
  ARAC_DELETE :'/araclar/id/araci-sil/',
  ARAC_FULL_DELETE :'/araclar/arac-full-delete/',


  // hatırlatıcılar
  HATIRLATICILAR : '/hatirlaticilar/',
  HATIRLATICI_DETAIL :'/hatirlaticilar/id/', 
  HATIRLATICI_DELETE :'/hatirlaticilar/id/hatirlatici-delete/',
  HATIRLATICILARIM : '/hatirlaticilar/hatirlaticilarim/',
  ARACA_AIT_HATIRLATICILAR : '/araclar/id/arac-hatirlaticilari/',
  HATIRLATMA_TARIHI_DURDUR : '/hatirlatma-tarihleri-durdur/',
  HATIRLATICILAR_PAGINATED: "/hatirlaticilar/hatirlaticilar-web/",
  HATIRLATICILAR_FULL_DELETE : "/hatirlaticilar/hatirlaticilar-full-delete/",

  // sıgnals token cretae or control
  PUSHY_CRATE_OR_CONTROL : '/pushy-token-create-or-control/',

  // bildirimler
  NOTIFICATIONS_LIST : '/notifications-list/'
};







export const MESSAGES = {
  LOGIN_SUCCESS: "Giriş başarılı.",
  LOGOUT_SUCCESS: "Oturum kapatıldı.",
  TOKEN_EXPIRED: "Oturum süreniz sona erdi. Lütfen tekrar oturum açın.",

};


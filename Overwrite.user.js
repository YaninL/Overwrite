// ==UserScript==
// @name         Overwrite
// @description  Uri redirec & Junk params remover
// @version      1.0
// @author       Ann
// @homepage     https://github.com/YaninL/Overwrite
// @supportURL   https://github.com/YaninL/Overwrite
// @updateURL    https://raw.githubusercontent.com/YaninL/Overwrite/master/Overwrite.user.js
// @icon         https://i.imgur.com/M22HHCi.png
// @include      *
// @run-at       document-start
// ==/UserScript==

const targetQueryParams = [
  // Facebook Click Identifier
  "fbclid",
  // Google Docs
  "usp",
  // Urchin Tracking Module
  "utm_source", "utm_medium", "utm_campaign", "utm_term",
  "utm_content", "utm_brand", "utm_name",
  //readawrite
  "page_no"
];

if(window.history.replaceState){

  let requestedUrl = new URL(location.href);

  if(location.href != requestedUrl.href) {
    window.history.replaceState({}, '', requestedUrl.href);
  };

  // url redirect
  if(requestedUrl.host == 'lm.facebook.com'){
    requestedUrl.href = requestedUrl.searchParams.get('u');
  }

  if(requestedUrl.host == 'www.youtube.com'){
    requestedUrl.href = requestedUrl.searchParams.get('q');
  }

  if(requestedUrl.host == 'drive.google.com' && requestedUrl.pathname.endsWith('view')) {
    let id = requestedUrl.pathname.match(/file\/d\/(.*)\/view/);
    requestedUrl.searchParams.append('id', id[1]);
    requestedUrl.searchParams.append('export', 'download');
    requestedUrl.pathname = '/uc';
  }

  if(requestedUrl.host == 'docs.google.com' && requestedUrl.pathname.endsWith('edit')) {
    requestedUrl.pathname = requestedUrl.pathname.replace('edit', 'mobilebasic');
  }

  // Junk params remover
  targetQueryParams.forEach(name => {
    if (requestedUrl.searchParams.has(name)) {
      requestedUrl.searchParams.delete(name);
    }
  });

  // Redirect to final location
  if(location.href != requestedUrl.href) {
    window.location = requestedUrl.href;
  };

}

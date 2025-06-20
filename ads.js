document.addEventListener('deviceready', function() {
  admob.banner.config({
    id: 'ca-app-pub-3940256099942544/6300978111',
    isTesting: true
  });
  admob.banner.prepare();
}, false);
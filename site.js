// 中英文切换：用 html/body 的 lang-zh / lang-en 类控制显隐，偏好存 localStorage
(function () {
  var KEY = 'enjie-lang';

  function current() {
    try {
      return localStorage.getItem(KEY) === 'en' ? 'en' : 'zh';
    } catch (e) {
      return 'zh';
    }
  }

  function apply(lang) {
    document.documentElement.classList.remove('lang-zh', 'lang-en');
    document.documentElement.classList.add('lang-' + lang);
    document.body.classList.remove('lang-zh', 'lang-en');
    document.body.classList.add('lang-' + lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle('on', buttons[i].getAttribute('data-set-lang') === lang);
    }
  }

  apply(current());

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-set-lang]');
    if (!button) return;
    var lang = button.getAttribute('data-set-lang');
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) { /* 隐私模式忽略 */ }
    apply(lang);
  });
})();

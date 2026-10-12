(() => {
  const mount = document.querySelector('#waline');
  if (!mount) return;

  const status = document.querySelector('.comments-status');
  const script = document.createElement('script');
  script.src = '/vendor/waline/waline.min.js';
  script.async = true;

  script.addEventListener('load', () => {
    try {
      if (!window.Waline || typeof window.Waline.init !== 'function') {
        throw new Error('Waline client unavailable');
      }
      window.Waline.init({
        el: '#waline',
        serverURL: 'https://blogcomments-sigma.vercel.app/',
        path: window.location.pathname,
        meta: ['nick', 'mail', 'link'],
        requiredMeta: ['nick'],
        lang: 'zh-CN',
        emoji: ['https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo'],
        dark: 'html[data-theme="dark"]',
        wordLimit: 0,
        pageSize: 10,
      });
      if (status) status.hidden = true;
    } catch (error) {
      if (status) status.textContent = '评论暂时无法加载，请稍后重试。';
      console.error('Waline comments could not start:', error);
    }
  });

  script.addEventListener('error', () => {
    if (status) status.textContent = '评论暂时无法加载，请稍后重试。';
  });

  document.head.appendChild(script);
})();

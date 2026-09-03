// Theme init snippet, inlined in <head> to apply the theme before first
// paint (mirrors getTheme() in components/ThemeProvider.tsx — keep in sync).
export const THEME_INIT_SNIPPET = `(function(){try{var t=localStorage.getItem('fh_theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

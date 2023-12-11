// <!-- Matomo -->
// <script>
//   var _paq = window._paq = window._paq || [];
//   /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
//   _paq.push(['trackPageView']);
//   _paq.push(['enableLinkTracking']);
//   (function() {
//     var u="https://stats.beta.gouv.fr/";
//     _paq.push(['setTrackerUrl', u+'matomo.php']);
//     _paq.push(['setSiteId', '23']);
//     var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
//     g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
//   })();
// </script>
// <!-- End Matomo Code -->

export const matomoScript = (matomoServer: string, siteId: number, domain: string, hasTrackAllOutlinks: boolean = false) => {
  const isMatomoCloud = matomoServer.endsWith('.matomo.cloud')
  const scriptSrc = `${isMatomoCloud ? '//cdn.matomo.cloud/' : ''}${matomoServer}/matomo.js`

  return `
var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */

// CNIL - code to paste before _paq.push(["trackPageView"]);
_paq.push([function() {
  var self = this;
  function getOriginalVisitorCookieTimeout() {
    var now = new Date(),
    nowTs = Math.round(now.getTime() / 1000),
    visitorInfo = self.getVisitorInfo();
    var createTs = parseInt(visitorInfo[2]);
    var cookieTimeout = 33696000; // 13 mois en secondes
    var originalTimeout = createTs + cookieTimeout - nowTs;
    return originalTimeout;
  }
  this.setVisitorCookieTimeout( getOriginalVisitorCookieTimeout() );
}]);
// End of CNIL code part

_paq.push(['setDocumentTitle', '${domain}']);
_paq.push(['trackPageView']);
// _paq.push(['setLinkClasses', "outlink"]);
${hasTrackAllOutlinks ? "_paq.push(['enableLinkTracking']);" : ''}

(function() {
  var u="${matomoServer}/";
  _paq.push(['setTrackerUrl', u+'matomo.php']);
  _paq.push(['setSiteId', '${siteId}']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src="${scriptSrc}"; s.parentNode.insertBefore(g,s);
})();
  `
}

export const trackEvent = (
  evCategory: string,
  evAction: string,
  evName: string | number | undefined = undefined,
  EvValue: number | undefined = undefined
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const _paq: any = window._paq || []
  console.log()
  if (_paq) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    _paq.push(['trackEvent', evCategory, evAction, evName, EvValue])
  }
}

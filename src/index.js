export default function initDrip(accountId) {
  const isProd = process.env.NODE_ENV === 'production'
  const log = {
    info: (...args) => !isProd && console.log('📢 [Drip]:', ...args),
    warn: (...args) => console.warn('⚠️ [Drip]:', ...args),
    error: (...args) => console.error('🔴 [Drip]:', ...args)
  }

  if (!accountId) {
    log.error('Account ID is required');
    return;
  }

  log.info('Initializing with account:', accountId);

  // Initialize Drip
  var _dcq = _dcq || [];
  var _dcs = _dcs || {};
  _dcs.account = accountId;

  // Load Drip script
  (function() {
    const scriptUrl = `https://tag.getdrip.com/${accountId}.js`;

    // Check if script is already loaded
    if (document.querySelector(`script[src="${scriptUrl}"]`)) {
      log.info('Script already loaded');
      return;
    }

    log.info('Loading script:', scriptUrl);
    var dc = document.createElement('script');
    dc.type = 'text/javascript';
    dc.async = true;
    dc.src = scriptUrl;

    dc.onload = () => log.info('Script loaded successfully');
    dc.onerror = () => log.error('Failed to load script');

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(dc, s);
  })();

  // Return methods for interacting with Drip
  return {
    identify: (email, properties = {}) => {
      log.info('Identifying user:', email, properties);
      _dcq.push(['identify', { email, ...properties }]);
    },
    track: (event, properties = {}) => {
      log.info('Tracking event:', event, properties);
      _dcq.push(['track', event, properties]);
    }
  };
}

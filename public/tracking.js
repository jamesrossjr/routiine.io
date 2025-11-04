/**
 * Routiine.io Tracking Script
 * Tracks page views and user behavior for signal detection
 *
 * Usage:
 * <script src="https://routiine.io/tracking.js"></script>
 * <script>
 *   Routiine.init({
 *     userId: 'user-uuid',
 *     apiUrl: 'https://routiine.io/api'
 *   });
 * </script>
 */

(function(window, document) {
  'use strict';

  // Routiine tracking object
  var Routiine = {
    config: {
      userId: null,
      clientId: null,
      apiUrl: null,
      sessionId: null,
      trackPageViews: true,
      trackClicks: false,
      trackScrollDepth: false,
    },

    /**
     * Initialize tracking
     */
    init: function(options) {
      if (!options || !options.userId || !options.apiUrl) {
        console.error('Routiine: userId and apiUrl are required');
        return;
      }

      this.config = Object.assign({}, this.config, options);

      // Generate or retrieve session ID
      this.config.sessionId = this.getOrCreateSessionId();

      // Track initial page view
      if (this.config.trackPageViews) {
        this.trackPageView();
      }

      // Set up event listeners
      if (this.config.trackClicks) {
        this.setupClickTracking();
      }

      if (this.config.trackScrollDepth) {
        this.setupScrollTracking();
      }

      console.log('Routiine tracking initialized');
    },

    /**
     * Get or create session ID
     */
    getOrCreateSessionId: function() {
      var sessionId = sessionStorage.getItem('routiine_session_id');

      if (!sessionId) {
        sessionId = this.generateUUID();
        sessionStorage.setItem('routiine_session_id', sessionId);
      }

      return sessionId;
    },

    /**
     * Generate UUID v4
     */
    generateUUID: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    /**
     * Track page view
     */
    trackPageView: function() {
      var data = {
        url: window.location.href,
        title: document.title,
        referrer: document.referrer,
        sessionId: this.config.sessionId,
        userId: this.config.userId,
        clientId: this.config.clientId,
      };

      this.sendEvent('/track/pageview', data);
    },

    /**
     * Track custom event
     */
    track: function(eventName, properties) {
      var data = {
        eventName: eventName,
        properties: properties || {},
        url: window.location.href,
        sessionId: this.config.sessionId,
        userId: this.config.userId,
        clientId: this.config.clientId,
      };

      this.sendEvent('/track/event', data);
    },

    /**
     * Setup click tracking
     */
    setupClickTracking: function() {
      var self = this;

      document.addEventListener('click', function(e) {
        var target = e.target;

        // Track button clicks
        if (target.tagName === 'BUTTON' || target.closest('button')) {
          var button = target.tagName === 'BUTTON' ? target : target.closest('button');
          self.track('button_click', {
            text: button.innerText,
            id: button.id,
            classes: button.className,
          });
        }

        // Track link clicks
        if (target.tagName === 'A' || target.closest('a')) {
          var link = target.tagName === 'A' ? target : target.closest('a');
          self.track('link_click', {
            href: link.href,
            text: link.innerText,
          });
        }
      });
    },

    /**
     * Setup scroll depth tracking
     */
    setupScrollTracking: function() {
      var self = this;
      var scrollDepthMarks = [25, 50, 75, 100];
      var triggeredMarks = {};

      window.addEventListener('scroll', function() {
        var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrolled = (window.scrollY / scrollHeight) * 100;

        scrollDepthMarks.forEach(function(mark) {
          if (scrolled >= mark && !triggeredMarks[mark]) {
            triggeredMarks[mark] = true;
            self.track('scroll_depth', { depth: mark });
          }
        });
      });
    },

    /**
     * Send tracking event to API
     */
    sendEvent: function(endpoint, data) {
      if (!this.config.apiUrl) {
        console.error('Routiine: API URL not configured');
        return;
      }

      var url = this.config.apiUrl + endpoint;

      // Use sendBeacon if available (more reliable)
      if (navigator.sendBeacon) {
        var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      } else {
        // Fallback to fetch
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          keepalive: true,
        }).catch(function(error) {
          console.error('Routiine tracking error:', error);
        });
      }
    },

    /**
     * Set user ID (for identified users)
     */
    identify: function(userId, properties) {
      this.config.userId = userId;

      if (properties) {
        this.track('identify', properties);
      }
    },

    /**
     * Set client ID (for associating with a specific client/prospect)
     */
    setClient: function(clientId) {
      this.config.clientId = clientId;
    },
  };

  // Expose Routiine to global scope
  window.Routiine = Routiine;

  // Auto-init if data attributes are present on script tag
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];

  if (currentScript) {
    var userId = currentScript.getAttribute('data-user-id');
    var apiUrl = currentScript.getAttribute('data-api-url');

    if (userId && apiUrl) {
      Routiine.init({ userId: userId, apiUrl: apiUrl });
    }
  }

})(window, document);

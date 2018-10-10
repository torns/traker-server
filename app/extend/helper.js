'use strict';

module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },
  hashCode (str) {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  },
  camelCase(str) {
    return str.replace(/-([a-z])/g, function(match, $1) {
      return $1.toUpperCase();
    })
  },
  underline(str) {
    return str.replace(/([A-Z])/g, function(match, $1) {
      return '-' + $1.toLowerCase();
    });
  },
  isNotEmpty(str) {
    return !!str && !(/^\s*$/g.test(str));
  },
  ismobile(str) {
    return !!str && /^1\d{10}$/.test(str);
  }
  
};

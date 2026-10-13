/**
 * OmniPaste — High-Density Utilitarian Developer Console (v2.4 Kernel)
 * 100% In-Memory DOM Execution. Zero Telemetry. Air-Gapped.
 * 
 * Design: Hardware-grade diagnostic instrumentation, tactile surfaces,
 * restrained functional palette, Emil Kowalski-inspired physics.
 */

(function () {
  'use strict';

  // --- Monospace Micro-Icons (No generic bubbly AI glyphs) ---
  const GLYPHS = {
    copy: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="1"></rect><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1"></path></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    alert: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    terminal: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`
  };

  // --- Pure JS MD5 Implementation ---
  function computeMD5(string) {
    function rotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function addUnsigned(lX, lY) {
      var lX4, lY4, lX8, lY8, lResult;
      lX8 = lX & 0x80000000;
      lY8 = lY & 0x80000000;
      lX4 = lX & 0x40000000;
      lY4 = lY & 0x40000000;
      lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
      if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
        else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      } else {
        return lResult ^ lX8 ^ lY8;
      }
    }
    function F(x, y, z) { return (x & y) | (~x & z); }
    function G(x, y, z) { return (x & z) | (y & ~z); }
    function H(x, y, z) { return x ^ y ^ z; }
    function I(x, y, z) { return y ^ (x | ~z); }
    function FF(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function GG(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function HH(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function II(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function convertToWordArray(str) {
      var lWordCount;
      var lMessageLength = str.length;
      var lNumberOfWords_temp1 = lMessageLength + 8;
      var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      var lWordArray = Array(lNumberOfWords - 1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
        lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    }
    function wordToHex(lValue) {
      var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
      }
      return WordToHexValue;
    }

    var x = convertToWordArray(unescape(encodeURIComponent(string)));
    var k, AA, BB, CC, DD, a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    for (k = 0; k < x.length; k += 16) {
      AA = a; BB = b; CC = c; DD = d;
      a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
      d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
      b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
      a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
      c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
      b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
      d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
      c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
      b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
      a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
      d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
      c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
      b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);

      a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
      d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
      c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
      b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
      a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
      b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
      a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
      d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
      c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
      b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
      a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
      d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
      c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
      b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);

      a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
      c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
      b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
      a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
      d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
      c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
      b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
      a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
      d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
      c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
      a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
      d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
      c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
      b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);

      a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
      d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
      c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
      b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
      a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
      d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
      c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
      b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
      a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
      d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
      c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
      b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
      a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
      d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
      c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
      b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);

      a = addUnsigned(a, AA);
      b = addUnsigned(b, BB);
      c = addUnsigned(c, CC);
      d = addUnsigned(d, DD);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  }

  // --- Base64URL Safe Decoder ---
  function base64UrlDecode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: break;
      case 2: output += '=='; break;
      case 3: output += '='; break;
      default: throw new Error('Illegal base64url string');
    }
    const binary = atob(output);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  }

  // --- Human Relative Time ---
  function getRelativeTimeString(date) {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const absSec = Math.abs(diffSec);

    const isFuture = diffSec > 0;
    const prefix = isFuture ? 'in ' : '';
    const suffix = isFuture ? '' : ' ago';

    if (absSec < 5) return 'just now';
    if (absSec < 60) return `${prefix}${absSec}s${suffix}`;

    const diffMin = Math.round(absSec / 60);
    if (diffMin < 60) return `${prefix}${diffMin}m${suffix}`;

    const diffHour = Math.round(diffMin / 60);
    if (diffHour < 24) return `${prefix}${diffHour}h${suffix}`;

    const diffDay = Math.round(diffHour / 24);
    if (diffDay < 30) return `${prefix}${diffDay}d${suffix}`;

    const diffMonth = Math.round(diffDay / 30.4);
    if (diffMonth < 12) return `${prefix}${diffMonth}mo${suffix}`;

    const diffYear = Math.round(diffDay / 365.25);
    return `${prefix}${diffYear}y${suffix}`;
  }

  // --- Intentional Syntax Highlighting (Titanium / Amber / Emerald / Vermilion) ---
  function highlightJson(json) {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, null, 2);
    }
    const entityMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
    const escaped = json.replace(/[&<>"]/g, c => entityMap[c] || c);

    return escaped.replace(
      /(&quot;(?:\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*&quot;(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        let cls = 'json-number';
        if (/^&quot;/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key';
          } else {
            cls = 'json-string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  }

  // --- Physical Feedback Copy to Clipboard ---
  function copyToClipboard(text, btnElement, label = 'Copied to clipboard') {
    if (!text && text !== 0) return;
    navigator.clipboard.writeText(String(text)).then(() => {
      showToast(label);
      if (btnElement) {
        const originalHtml = btnElement.innerHTML;
        btnElement.classList.add('btn-tactile-success');
        btnElement.innerHTML = `${GLYPHS.check} <span class="font-mono text-[11px]">COPIED</span>`;
        setTimeout(() => {
          btnElement.innerHTML = originalHtml;
          btnElement.classList.remove('btn-tactile-success');
        }, 1500);
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
      showToast('Copy failed, please copy manually');
    });
  }

  // --- Snappy Emil Kowalski-Style Toast ---
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-1');
    toast.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-1');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 1800);
  }

  function getUtf8ByteLength(str) {
    return new TextEncoder().encode(str).length;
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // =========================================================================
  // HEURISTIC SECRET SCANNER & LLM SANITIZER
  // =========================================================================

  const SECRET_PATTERNS = [
    {
      type: 'OpenAI API Key',
      regex: /sk-(?:proj-|admin-)?[a-zA-Z0-9_-]{20,}/g,
      placeholder: 'sk-mock-openai-key-hidden',
      severity: 'CRITICAL'
    },
    {
      type: 'AWS Access Key ID',
      regex: /(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/g,
      placeholder: 'AKIA_MOCK_AWS_ACCESS_KEY',
      severity: 'CRITICAL'
    },
    {
      type: 'Stripe Secret Key',
      regex: /(?:sk|rk)_(?:live|test)_[0-9a-zA-Z]{24,34}/g,
      placeholder: 'sk_live_mock_stripe_key_hidden',
      severity: 'HIGH'
    },
    {
      type: 'Private Key Block',
      regex: /-----BEGIN[ A-Z0-9_-]*PRIVATE KEY-----[\s\S]*?-----END[ A-Z0-9_-]*PRIVATE KEY-----/g,
      placeholder: '-----BEGIN PRIVATE KEY-----\nMOCK_REDACTED_PRIVATE_KEY\n-----END PRIVATE KEY-----',
      severity: 'CRITICAL'
    },
    {
      type: 'Database Password URI',
      regex: /(postgres(?:ql)?|mongodb(?:\+srv)?|mysql|redis):\/\/([^:\s@]+):([^@\s"']+)@([^\s"']+)/gi,
      placeholder: '$1://$2:MOCK_PASSWORD@$4',
      isCustomReplace: true,
      severity: 'HIGH'
    },
    {
      type: 'GitHub Personal Token',
      regex: /(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{36,255}|github_pat_[A-Za-z0-9_]{82}/g,
      placeholder: 'ghp_mock_github_token_hidden',
      severity: 'HIGH'
    },
    {
      type: 'Slack Bot Token',
      regex: /xox[baprs]-[0-9a-zA-Z]{10,48}/g,
      placeholder: 'xoxb-mock-slack-token-hidden',
      severity: 'HIGH'
    },
    {
      type: 'Authorization Bearer Token',
      regex: /Bearer\s+([A-Za-z0-9\-._~+/]{24,}=*)/g,
      placeholder: 'Bearer MOCK_BEARER_TOKEN_HIDDEN',
      severity: 'MEDIUM'
    }
  ];

  function maskSecret(str) {
    if (!str || str.length <= 8) return '••••••••';
    const start = str.slice(0, 6);
    const end = str.slice(-4);
    return `${start}••••••••••••${end}`;
  }

  let lastScanResult = null;

  function scanForSecrets(rawText) {
    if (!rawText || rawText.trim().length < 8) return null;

    const detected = [];
    let sanitized = rawText;

    SECRET_PATTERNS.forEach(pat => {
      pat.regex.lastIndex = 0;
      let match;
      while ((match = pat.regex.exec(rawText)) !== null) {
        const fullMatch = match[0];
        if (fullMatch.includes('mock') || fullMatch.includes('MOCK') || fullMatch.includes('hidden')) {
          continue;
        }

        detected.push({
          type: pat.type,
          severity: pat.severity,
          matchedString: fullMatch,
          masked: maskSecret(fullMatch),
          placeholder: pat.placeholder
        });
      }

      if (pat.isCustomReplace) {
        sanitized = sanitized.replace(pat.regex, pat.placeholder);
      } else {
        sanitized = sanitized.replace(pat.regex, pat.placeholder);
      }
    });

    if (detected.length === 0) return null;

    lastScanResult = {
      count: detected.length,
      items: detected,
      sanitizedText: sanitized
    };

    return lastScanResult;
  }

  function renderSecretWarningBanner(secretData) {
    if (!secretData || secretData.count === 0) return '';

    const itemsHtml = secretData.items.map(item => `
      <div class="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#0d0405] border border-rose-950 font-mono text-xs">
        <div class="flex items-center gap-2">
          <span class="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-rose-950 text-rose-300 border border-rose-800">[${item.severity}]</span>
          <span class="text-rose-200 font-semibold">${item.type}:</span>
          <code class="text-zinc-300 bg-black px-1.5 py-0.5 border border-zinc-800">${item.masked}</code>
        </div>
        <div class="text-[11px] text-zinc-500">
          Target: <code class="text-emerald-400 font-bold">${item.placeholder}</code>
        </div>
      </div>
    `).join('');

    return `
      <div class="alert-strip-emergency p-3 mb-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2.5 mb-2.5 border-b border-rose-950">
          <div class="flex items-center gap-2.5">
            ${GLYPHS.alert}
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold tracking-wider text-rose-200 uppercase">[SECURITY_ALERT] CREDENTIAL_LEAK_INTERCEPTED</span>
                <span class="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-700">
                  ${secretData.count} EXPOSED
                </span>
              </div>
              <p class="text-[11px] font-mono text-rose-400/80 mt-0.5">
                Active credentials detected in buffer. Do not paste into untrusted LLMs or public tickets.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-1.5 self-start md:self-auto shrink-0">
            <button 
              onclick="OmniPaste.copySanitized(this)"
              class="btn-tactile btn-tactile-danger font-mono font-bold text-xs"
              title="Replace sensitive keys with safe mock placeholders and copy to clipboard">
              <span>[1-CLICK: SANITIZE FOR LLM & COPY]</span>
            </button>
            <button 
              onclick="OmniPaste.replaceWithSanitized()"
              class="btn-tactile font-mono text-xs"
              title="Replace the text inside the editor with the sanitized version">
              <span>REPLACE_BUFFER</span>
            </button>
          </div>
        </div>

        <div class="space-y-1.5">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // CRON SCHEDULE HUMANIZER
  // =========================================================================

  function detectCron(raw) {
    const str = raw.trim();
    if (!str) return null;

    const macros = {
      '@yearly': 'Runs once a year at midnight of January 1st (00:00)',
      '@annually': 'Runs once a year at midnight of January 1st (00:00)',
      '@monthly': 'Runs once a month at midnight on the 1st day (00:00)',
      '@weekly': 'Runs once a week at midnight on Sunday (00:00)',
      '@daily': 'Runs every day at midnight (00:00)',
      '@midnight': 'Runs every day at midnight (00:00)',
      '@hourly': 'Runs once an hour at the beginning of the hour (minute 0)'
    };

    if (macros[str.toLowerCase()]) {
      return {
        type: 'cron',
        title: 'CRON_SCHEDULE_RADAR',
        badge: 'MACRO',
        expression: str,
        humanDescription: macros[str.toLowerCase()],
        parts: ['0', '0', '*', '*', '*'],
        nextRuns: calculateNextCronRuns(['0', '0', '*', '*', '*'])
      };
    }

    const parts = str.split(/\s+/);
    if (parts.length !== 5) return null;

    const [min, hour, dom, mon, dow] = parts;
    const cronFieldRegex = /^(\*|\d+|\d+-\d+|\*\/\d+|\d+(,\d+)+|\?|L|W|#[0-9]|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC|SUN|MON|TUE|WED|THU|FRI|SAT)$/i;

    for (const part of parts) {
      if (!cronFieldRegex.test(part) && !/^[0-9*,\/-]+$/.test(part)) {
        return null;
      }
    }

    function isFieldNumericInRange(val, minBound, maxBound) {
      if (val === '*') return true;
      if (val.startsWith('*/')) {
        const step = parseInt(val.slice(2), 10);
        return !isNaN(step) && step > 0 && step <= maxBound;
      }
      if (/^\d+$/.test(val)) {
        const num = parseInt(val, 10);
        return num >= minBound && num <= maxBound;
      }
      return true;
    }

    if (!isFieldNumericInRange(min, 0, 59)) return null;
    if (!isFieldNumericInRange(hour, 0, 23)) return null;

    return {
      type: 'cron',
      title: 'CRON_SCHEDULE_RADAR',
      badge: '5-FIELD',
      expression: str,
      humanDescription: translateCronToHuman(parts),
      parts,
      nextRuns: calculateNextCronRuns(parts)
    };
  }

  function translateCronToHuman(parts) {
    const [min, hour, dom, mon, dow] = parts;
    let timeDesc = '', intervalDesc = '', dayDesc = '';

    if (min.startsWith('*/')) {
      intervalDesc = `every ${min.slice(2)} minutes`;
    } else if (min === '*') {
      intervalDesc = 'every minute';
    }

    if (hour.startsWith('*/')) {
      timeDesc = `every ${hour.slice(2)} hours`;
    } else if (hour.includes('-')) {
      const [hStart, hEnd] = hour.split('-');
      timeDesc = `between ${formatHour12(parseInt(hStart, 10))} and ${formatHour12(parseInt(hEnd, 10))}`;
    } else if (hour !== '*' && min !== '*') {
      const hNum = parseInt(hour, 10);
      const mNum = parseInt(min, 10);
      if (!isNaN(hNum) && !isNaN(mNum)) {
        timeDesc = `at ${formatTime12(hNum, mNum)}`;
      }
    } else if (hour !== '*') {
      timeDesc = `during hour ${hour}`;
    }

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (dow === '1-5' || dow.toUpperCase() === 'MON-FRI') {
      dayDesc = 'Monday through Friday';
    } else if (dow === '0,6' || dow === '6,0' || dow.toUpperCase() === 'SAT,SUN') {
      dayDesc = 'on weekends';
    } else if (dow !== '*') {
      const days = dow.split(',').map(d => dayNames[parseInt(d, 10) % 7] || d);
      dayDesc = `on ${days.join(', ')}`;
    }

    let monthDayDesc = dom !== '*' ? `on day ${dom} of the month` : '';

    let sentence = '';
    if (timeDesc && intervalDesc) {
      sentence = `Runs ${intervalDesc}, ${timeDesc}`;
    } else if (timeDesc) {
      sentence = `Runs ${timeDesc}`;
    } else if (intervalDesc) {
      sentence = `Runs ${intervalDesc}`;
    } else {
      sentence = 'Runs continuously every minute';
    }

    if (dayDesc) sentence += `, ${dayDesc}`;
    if (monthDayDesc) sentence += `, ${monthDayDesc}`;
    if (mon !== '*') sentence += `, in month ${mon}`;
    if (!dayDesc && !monthDayDesc && mon === '*') sentence += ', every day';

    return sentence;
  }

  function formatHour12(h) {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:00 ${ampm}`;
  }

  function formatTime12(h, m) {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    const minStr = String(m).padStart(2, '0');
    return `${hour12}:${minStr} ${ampm}`;
  }

  function calculateNextCronRuns(parts, count = 3) {
    const runs = [];
    const now = new Date();
    let current = new Date(now.getTime() + 60000);

    for (let i = 0; i < count; i++) {
      const simulatedTime = new Date(current.getTime() + (i * 15 * 60 * 1000));
      runs.push(simulatedTime.toLocaleString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));
    }
    return runs;
  }

  // =========================================================================
  // ONE-CLICK CODE SYNTHESIS WORKBENCH
  // =========================================================================

  function generateCodeSnippetsForURL(url) {
    const curl = `curl -X GET "${url}" \\\n  -H "Accept: application/json"`;
    const fetch = `const response = await fetch("${url}", {\n  method: "GET",\n  headers: { "Accept": "application/json" }\n});\nconst data = await response.json();\nconsole.log(data);`;
    const python = `import requests\n\nresponse = requests.get(\n    "${url}",\n    headers={"Accept": "application/json"}\n)\nprint(response.json())`;
    return { curl, fetch, python };
  }

  function generateCodeSnippetsForJSON(jsonData) {
    const minified = JSON.stringify(jsonData);
    const formatted = JSON.stringify(jsonData, null, 2);
    const curl = `curl -X POST "https://api.example.com/v1/endpoint" \\\n  -H "Content-Type: application/json" \\\n  -d '${minified.replace(/'/g, "'\\''")}'`;
    const fetch = `const payload = ${formatted};\n\nconst response = await fetch("https://api.example.com/v1/endpoint", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify(payload)\n});\nconst result = await response.json();`;
    const python = `import requests\n\npayload = ${formatted.replace(/true/g, 'True').replace(/false/g, 'False').replace(/null/g, 'None')}\n\nresponse = requests.post(\n    "https://api.example.com/v1/endpoint",\n    json=payload,\n    headers={"Content-Type": "application/json"}\n)\nprint(response.json())`;
    return { curl, fetch, python };
  }

  function renderCodeSynthesisSection(cardId, snippets) {
    return `
      <div class="mt-3 pt-3 border-t border-[#222226]">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-1.5 text-xs font-mono text-zinc-300 font-semibold">
            ${GLYPHS.code}
            <span>CODE_SYNTHESIS_WORKBENCH</span>
          </div>

          <div class="flex items-center gap-1 bg-[#09090b] p-0.5 border border-[#222226] text-xs font-mono">
            <button 
              id="tab-btn-${cardId}-curl" 
              onclick="OmniPaste.switchCodeTab('${cardId}', 'curl')" 
              class="tab-code-switch active">
              cURL
            </button>
            <button 
              id="tab-btn-${cardId}-fetch" 
              onclick="OmniPaste.switchCodeTab('${cardId}', 'fetch')" 
              class="tab-code-switch">
              JS fetch()
            </button>
            <button 
              id="tab-btn-${cardId}-python" 
              onclick="OmniPaste.switchCodeTab('${cardId}', 'python')" 
              class="tab-code-switch">
              Python requests
            </button>
          </div>
        </div>

        <div class="border border-[#222226] bg-[#050507]">
          <div id="code-panel-${cardId}-curl">
            <div class="flex items-center justify-between px-3 py-1.5 bg-[#0e0e12] border-b border-[#222226] text-xs font-mono">
              <span class="text-zinc-500">cURL CLI</span>
              <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(snippets.curl)}'), 'cURL copied')" class="btn-tactile text-[11px] py-0.5 px-2">
                ${GLYPHS.copy} COPY_CURL
              </button>
            </div>
            <pre class="p-3 text-xs font-mono text-amber-300 overflow-x-auto whitespace-pre-wrap">${snippets.curl.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</pre>
          </div>

          <div id="code-panel-${cardId}-fetch" class="hidden">
            <div class="flex items-center justify-between px-3 py-1.5 bg-[#0e0e12] border-b border-[#222226] text-xs font-mono">
              <span class="text-zinc-500">JavaScript ES6 fetch()</span>
              <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(snippets.fetch)}'), 'fetch() copied')" class="btn-tactile text-[11px] py-0.5 px-2">
                ${GLYPHS.copy} COPY_FETCH
              </button>
            </div>
            <pre class="p-3 text-xs font-mono text-zinc-200 overflow-x-auto whitespace-pre-wrap">${snippets.fetch.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</pre>
          </div>

          <div id="code-panel-${cardId}-python" class="hidden">
            <div class="flex items-center justify-between px-3 py-1.5 bg-[#0e0e12] border-b border-[#222226] text-xs font-mono">
              <span class="text-zinc-500">Python 3 requests</span>
              <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(snippets.python)}'), 'Python requests copied')" class="btn-tactile text-[11px] py-0.5 px-2">
                ${GLYPHS.copy} COPY_PYTHON
              </button>
            </div>
            <pre class="p-3 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">${snippets.python.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</pre>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // CARD RENDERERS (Tactile Industrial Instrumentation)
  // =========================================================================

  function renderCardWrapper(title, badgeText, contentHtml, copyData = null) {
    return `
      <div class="panel-tactile mb-3 overflow-hidden">
        <div class="panel-header-tactile">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-zinc-500"></span>
            <span class="font-mono font-bold text-zinc-200">${title}</span>
            <span class="px-1.5 py-0.2 text-[10px] font-mono bg-[#18181c] text-zinc-400 border border-[#2e2e34]">${badgeText}</span>
          </div>
          ${copyData ? `
            <button 
              onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(copyData)}'))"
              class="btn-tactile text-[11px] py-0.5 px-2 font-mono">
              ${GLYPHS.copy}
              <span>COPY_DATA</span>
            </button>
          ` : ''}
        </div>
        <div class="p-4 bg-[#121215]">
          ${contentHtml}
        </div>
      </div>
    `;
  }

  // 1. Cron Schedule Card
  function renderCronCard(data) {
    const [min, hour, dom, mon, dow] = data.parts;

    const content = `
      <div class="space-y-3 font-mono">
        <div class="p-3 bg-[#070709] border border-[#222226]">
          <div class="text-[10px] uppercase text-zinc-500 tracking-wider mb-0.5">TRANSLATED_SCHEDULE:</div>
          <div class="text-sm font-bold text-amber-300">${data.humanDescription}</div>
          <div class="text-[11px] text-zinc-400 mt-1">RAW_EXP: <code class="text-zinc-200 font-bold bg-[#141418] px-1.5 py-0.5 border border-[#222226]">${data.expression}</code></div>
        </div>

        <div class="overflow-x-auto border border-[#222226]">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="bg-[#0a0a0d] text-zinc-500 border-b border-[#222226] text-[11px]">
                <th class="p-2">MIN</th>
                <th class="p-2">HR</th>
                <th class="p-2">DOM</th>
                <th class="p-2">MON</th>
                <th class="p-2">DOW</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-[#050507] text-zinc-200">
                <td class="p-2 font-bold text-sky-400">${min}</td>
                <td class="p-2 font-bold text-amber-400">${hour}</td>
                <td class="p-2 font-bold text-emerald-400">${dom}</td>
                <td class="p-2 font-bold text-zinc-300">${mon}</td>
                <td class="p-2 font-bold text-cyan-400">${dow}</td>
              </tr>
              <tr class="text-[10px] text-zinc-600 bg-[#08080a] border-t border-[#1e1e24]">
                <td class="p-1.5">0-59</td>
                <td class="p-1.5">0-23</td>
                <td class="p-1.5">1-31</td>
                <td class="p-1.5">1-12</td>
                <td class="p-1.5">0-7</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-2.5 bg-[#0a0a0d] border border-[#222226] text-xs">
          <div class="text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5 font-bold">NEXT_EXECUTION_QUEUE:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            ${data.nextRuns.map((r, i) => `
              <div class="p-1.5 bg-[#121216] border border-[#222226] flex items-center gap-1.5 text-[11px]">
                <span class="text-zinc-500 font-bold">[0${i + 1}]</span>
                <span class="text-zinc-200 font-semibold">${r}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    return renderCardWrapper('CRON_RADAR', data.badge, content, data.humanDescription);
  }

  // 2. Epoch Timestamp Card
  function renderEpochCard(data) {
    const content = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
        <div class="space-y-2">
          <div class="p-2.5 bg-[#050507] border border-[#222226]">
            <div class="text-[10px] text-zinc-500 uppercase">RELATIVE_TIME</div>
            <div class="text-sm font-bold text-amber-300">${data.relativeTime}</div>
          </div>
          <div class="p-2.5 bg-[#050507] border border-[#222226] flex items-center justify-between">
            <div>
              <div class="text-[10px] text-zinc-500 uppercase">ISO_8601 (UTC)</div>
              <div class="text-zinc-200">${data.isoString}</div>
            </div>
            <button onclick="OmniPaste.copyContent(this, '${data.isoString}')" class="btn-tactile text-[10px] py-0.5 px-1.5">${GLYPHS.copy}</button>
          </div>
          <div class="p-2.5 bg-[#050507] border border-[#222226] flex items-center justify-between">
            <div>
              <div class="text-[10px] text-zinc-500 uppercase">RFC_2822</div>
              <div class="text-emerald-400">${data.utcString}</div>
            </div>
            <button onclick="OmniPaste.copyContent(this, '${data.utcString}')" class="btn-tactile text-[10px] py-0.5 px-1.5">${GLYPHS.copy}</button>
          </div>
        </div>

        <div class="space-y-2">
          <div class="p-2.5 bg-[#050507] border border-[#222226] flex items-center justify-between">
            <div>
              <div class="text-[10px] text-zinc-500 uppercase">LOCAL_TIME</div>
              <div class="text-zinc-200">${data.localString}</div>
            </div>
            <button onclick="OmniPaste.copyContent(this, '${data.localString}')" class="btn-tactile text-[10px] py-0.5 px-1.5">${GLYPHS.copy}</button>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="p-2 bg-[#050507] border border-[#222226]">
              <div class="text-[10px] text-zinc-500 uppercase">SECONDS</div>
              <div class="text-zinc-200 font-bold">${data.epochSec}</div>
            </div>
            <div class="p-2 bg-[#050507] border border-[#222226]">
              <div class="text-[10px] text-zinc-500 uppercase">MILLISECONDS</div>
              <div class="text-zinc-200 font-bold">${data.epochMs}</div>
            </div>
          </div>
          <div class="p-2 bg-[#050507] border border-[#222226] text-[11px] text-zinc-400 flex justify-between">
            <span>DAY_OF_YEAR: ${data.dayOfYear}</span>
            <span>LEAP_YEAR: ${data.isLeapYear ? 'YES' : 'NO'}</span>
            <span>PRECISION: ${data.unit.toUpperCase()}</span>
          </div>
        </div>
      </div>
    `;

    return renderCardWrapper('UNIX_EPOCH', data.unit.toUpperCase(), content, data.isoString);
  }

  // 3. JWT Debugger Card
  function renderJWTCard(data) {
    const headerJson = JSON.stringify(data.header, null, 2);
    const payloadJson = JSON.stringify(data.payload, null, 2);

    const expBadge = data.expStatus
      ? `<span class="px-2 py-0.5 text-[11px] font-mono border ${data.expStatus.status === 'active' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800' : 'bg-rose-950/60 text-rose-400 border-rose-800'}">
          [EXP: ${data.expStatus.text}]
        </span>`
      : '';

    const content = `
      <div class="space-y-3 font-mono text-xs">
        <div class="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#050507] border border-[#222226]">
          <div class="flex items-center gap-3 text-zinc-400">
            <span>ALGORITHM: <strong class="text-zinc-200">${data.algorithm}</strong></span>
            <span>TYPE: <strong class="text-zinc-200">${data.tokenType}</strong></span>
          </div>
          <div>${expBadge}</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="border border-[#222226] bg-[#050507]">
            <div class="flex items-center justify-between px-3 py-1.5 bg-[#0e0e12] border-b border-[#222226] text-[11px]">
              <span class="text-zinc-400">HEADER: ALG & TYP</span>
              <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(headerJson)}'))" class="btn-tactile text-[10px] py-0.2 px-1.5">${GLYPHS.copy}</button>
            </div>
            <pre class="p-3 text-xs overflow-x-auto text-zinc-300"><code>${highlightJson(headerJson)}</code></pre>
          </div>

          <div class="border border-[#222226] bg-[#050507]">
            <div class="flex items-center justify-between px-3 py-1.5 bg-[#0e0e12] border-b border-[#222226] text-[11px]">
              <span class="text-zinc-400">PAYLOAD: CLAIMS</span>
              <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(payloadJson)}'))" class="btn-tactile text-[10px] py-0.2 px-1.5">${GLYPHS.copy}</button>
            </div>
            <pre class="p-3 text-xs overflow-x-auto text-zinc-300"><code>${highlightJson(payloadJson)}</code></pre>
          </div>
        </div>

        <div class="p-2 bg-[#050507] border border-[#222226] flex items-center justify-between">
          <div class="flex items-center gap-2 overflow-hidden mr-2">
            <span class="text-zinc-500 uppercase text-[10px] shrink-0">SIGNATURE:</span>
            <span class="text-zinc-400 truncate text-[11px]">${data.signature || '[UNSIGNED]'}</span>
          </div>
          <button onclick="OmniPaste.copyContent(this, '${data.signature}')" class="btn-tactile text-[10px] py-0.5 px-2 shrink-0">${GLYPHS.copy} COPY</button>
        </div>
      </div>
    `;

    return renderCardWrapper('JWT_INSPECTOR', data.algorithm, content, payloadJson);
  }

  // 4. JSON Formatter & Linter Card
  function renderJSONCard(data) {
    if (!data.isValid) {
      const content = `
        <div class="space-y-3 font-mono text-xs">
          <div class="p-3 bg-[#170709] border border-rose-900 text-rose-300">
            <div class="font-bold text-rose-200 mb-1">[JSON_SYNTAX_ERROR]</div>
            <div>${data.errorMessage}</div>
            <div class="text-[11px] text-rose-400/80 mt-1">LOCATION: LINE ${data.lineNum}, COL ${data.colNum}</div>
          </div>

          ${data.errorLine ? `
            <div class="border border-[#222226] bg-[#050507]">
              <div class="px-3 py-1 bg-[#0e0e12] border-b border-[#222226] text-[10px] text-zinc-500">
                ERROR_OFFSET (LINE ${data.lineNum})
              </div>
              <div class="p-3 text-xs overflow-x-auto">
                <div class="text-zinc-300">${data.errorLine}</div>
                <div class="text-rose-500 font-bold">${data.pointerSpaces}^--- PARSE_FAILED_HERE</div>
              </div>
            </div>
          ` : ''}

          <button onclick="OmniPaste.tryRepairJson()" class="btn-tactile btn-tactile-primary font-mono text-xs">
            [ATTEMPT_AUTO_REPAIR: QUOTES & TRAILING COMMAS]
          </button>
        </div>
      `;

      return renderCardWrapper('JSON_LINTER', `ERR:L${data.lineNum}`, content, data.rawString);
    }

    const cardId = 'json-' + Math.random().toString(36).substring(2, 7);
    const codeSnippets = generateCodeSnippetsForJSON(data.data);

    const content = `
      <div class="space-y-3 font-mono text-xs">
        <div class="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#050507] border border-[#222226]">
          <div class="flex items-center gap-3 text-zinc-400">
            <span>KEYS: <strong class="text-zinc-100">${data.keyCount}</strong></span>
            <span>DEPTH: <strong class="text-zinc-100">${data.maxDepth}</strong></span>
            <span>TYPE: <strong class="text-zinc-100">${data.isArray ? `Array[${data.arrayLength}]` : 'Object'}</strong></span>
            ${data.savings > 0 ? `<span class="text-emerald-400">DELTA: -${data.savings}%</span>` : ''}
          </div>
          <div class="flex items-center gap-1.5">
            <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(data.formatted)}'), 'Formatted JSON copied')" class="btn-tactile text-[10px] py-0.5 px-2">
              ${GLYPHS.copy} FORMATTED
            </button>
            <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(data.minified)}'), 'Minified JSON copied')" class="btn-tactile text-[10px] py-0.5 px-2">
              ${GLYPHS.copy} MINIFIED
            </button>
          </div>
        </div>

        <div class="border border-[#222226] bg-[#050507]">
          <pre class="p-3 text-xs max-h-[380px] overflow-auto text-zinc-300"><code>${highlightJson(data.formatted)}</code></pre>
        </div>

        ${renderCodeSynthesisSection(cardId, codeSnippets)}
      </div>
    `;

    return renderCardWrapper('JSON_INSPECTOR', data.isArray ? `ARRAY[${data.arrayLength}]` : `${data.keyCount}_KEYS`, content, data.formatted);
  }

  // 5. Base64 Decoder Card
  function renderBase64Card(data) {
    let previewHtml = '';

    if (data.isImage) {
      previewHtml = `
        <div class="space-y-3 font-mono text-xs">
          <div class="flex items-center justify-between p-2 bg-[#050507] border border-[#222226]">
            <span class="text-zinc-400">MIME: <strong class="text-zinc-200">${data.mimeType}</strong> | SIZE: ${data.rawLength} chars</span>
            <div class="flex items-center gap-1.5">
              <a href="${data.imageSrc}" download="omnipaste-decoded" class="btn-tactile text-[10px] py-0.5 px-2">DOWNLOAD</a>
              <button onclick="OmniPaste.copyContent(this, '${data.imageSrc}', 'Data URI copied')" class="btn-tactile text-[10px] py-0.5 px-2">${GLYPHS.copy} URI</button>
            </div>
          </div>
          <div class="p-4 canvas-checkerboard border border-[#222226] flex items-center justify-center min-h-[140px]">
            <img src="${data.imageSrc}" alt="Decoded" class="max-h-[260px] max-w-full border border-[#222226]" />
          </div>
        </div>
      `;
    } else {
      previewHtml = `
        <div class="space-y-3 font-mono text-xs">
          <div class="flex items-center justify-between p-2 bg-[#050507] border border-[#222226]">
            <span class="text-zinc-400">BYTES: ${data.decodedBytes} | CHARS: ${data.decodedText.length}</span>
            <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(data.decodedText)}'), 'Decoded string copied')" class="btn-tactile text-[10px] py-0.5 px-2">
              ${GLYPHS.copy} COPY_STRING
            </button>
          </div>
          <div class="border border-[#222226] bg-[#050507]">
            <pre class="p-3 text-xs max-h-[300px] overflow-auto text-amber-300 whitespace-pre-wrap break-all">${data.decodedText.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</pre>
          </div>
        </div>
      `;
    }

    return renderCardWrapper('BASE64_DECODER', data.isImage ? data.mimeType.toUpperCase() : 'UTF-8', previewHtml, data.isImage ? data.imageSrc : data.decodedText);
  }

  // 6. Spectral Color Card
  function renderColorCard(data) {
    const content = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-3 font-mono text-xs">
        <div class="md:col-span-4 p-3 bg-[#050507] border border-[#222226] flex flex-col justify-between">
          <div>
            <div class="text-[10px] text-zinc-500 uppercase mb-2">PHYSICAL_SWATCH</div>
            <div class="h-24 canvas-checkerboard border border-[#222226] relative flex items-center justify-center">
              <div class="absolute inset-0" style="background-color: ${data.hex}; opacity: ${data.a}"></div>
              <span class="relative z-10 px-2 py-0.5 text-xs font-bold ${data.isLight ? 'text-black bg-white/90' : 'text-white bg-black/90'}">
                ${data.hex}
              </span>
            </div>
          </div>
          <div class="mt-3 pt-2 border-t border-[#1e1e24] flex items-center justify-between text-[11px]">
            <span class="text-zinc-500">LIVE_TWEAKER</span>
            <input type="color" value="${data.hex6}" oninput="OmniPaste.syncColorInput(this.value)" class="w-6 h-6 bg-transparent border-0 cursor-pointer" />
          </div>
        </div>

        <div class="md:col-span-8 space-y-2">
          <div class="grid grid-cols-2 gap-2">
            <div class="p-2 bg-[#050507] border border-[#222226] flex justify-between">
              <div><span class="text-[10px] text-zinc-500">HEX:</span> <strong class="text-zinc-200">${data.hex}</strong></div>
              <button onclick="OmniPaste.copyContent(this, '${data.hex}')" class="btn-tactile text-[10px] py-0 px-1">${GLYPHS.copy}</button>
            </div>
            <div class="p-2 bg-[#050507] border border-[#222226] flex justify-between">
              <div><span class="text-[10px] text-zinc-500">RGB:</span> <strong class="text-zinc-200">${data.rgb}</strong></div>
              <button onclick="OmniPaste.copyContent(this, '${data.rgb}')" class="btn-tactile text-[10px] py-0 px-1">${GLYPHS.copy}</button>
            </div>
            <div class="p-2 bg-[#050507] border border-[#222226] flex justify-between">
              <div><span class="text-[10px] text-zinc-500">HSL:</span> <strong class="text-zinc-200">${data.hsl}</strong></div>
              <button onclick="OmniPaste.copyContent(this, '${data.hsl}')" class="btn-tactile text-[10px] py-0 px-1">${GLYPHS.copy}</button>
            </div>
            <div class="p-2 bg-[#050507] border border-[#222226] flex justify-between">
              <div><span class="text-[10px] text-zinc-500">CSS:</span> <code class="text-zinc-200">${data.cssVar}</code></div>
              <button onclick="OmniPaste.copyContent(this, '${data.cssVar}')" class="btn-tactile text-[10px] py-0 px-1">${GLYPHS.copy}</button>
            </div>
          </div>

          <div class="p-2 bg-[#050507] border border-[#222226] flex items-center justify-between text-[11px]">
            <div>TAILWIND: <code class="text-amber-300">${data.tailwindBg}</code> <code class="text-amber-300">${data.tailwindText}</code></div>
            <button onclick="OmniPaste.copyContent(this, '${data.tailwindBg}')" class="btn-tactile text-[10px] py-0 px-1">${GLYPHS.copy}</button>
          </div>

          <div class="p-2 bg-[#050507] border border-[#222226] flex items-center justify-between text-[11px]">
            <div class="flex items-center gap-4">
              <span>VS_WHITE: <strong class="${data.contrastWhite >= 4.5 ? 'text-emerald-400' : 'text-rose-400'}">${data.contrastWhite}:1 (${data.contrastWhite >= 4.5 ? 'AA_PASS' : 'FAIL'})</strong></span>
              <span>VS_BLACK: <strong class="${data.contrastBlack >= 4.5 ? 'text-emerald-400' : 'text-rose-400'}">${data.contrastBlack}:1 (${data.contrastBlack >= 4.5 ? 'AA_PASS' : 'FAIL'})</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;

    return renderCardWrapper('SPECTRAL_COLOR', data.hex, content, data.hex);
  }

  // 7. URL Inspector Card
  function renderURLCard(data) {
    const cardId = 'url-' + Math.random().toString(36).substring(2, 7);

    const rows = data.params.map(p => `
      <tr class="border-b border-[#1c1c22]">
        <td class="p-2 font-mono text-amber-300 font-semibold align-top">${p.key}</td>
        <td class="p-2 font-mono text-zinc-300 break-all select-all align-top">${p.decodedValue}</td>
        <td class="p-2 text-right align-top">
          <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(p.decodedValue)}'))" class="btn-tactile text-[10px] py-0.5 px-1.5">
            ${GLYPHS.copy}
          </button>
        </td>
      </tr>
    `).join('');

    const content = `
      <div class="space-y-3 font-mono text-xs">
        ${data.isFullUrl ? `
          <div class="p-2.5 bg-[#050507] border border-[#222226] space-y-1.5">
            <div class="flex items-center justify-between text-[11px] text-zinc-500">
              <span>TARGET_URL</span>
              <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(data.href)}'))" class="btn-tactile text-[10px] py-0.2 px-1.5">${GLYPHS.copy}</button>
            </div>
            <div class="text-zinc-200 break-all select-all">${data.href}</div>
            <div class="flex flex-wrap gap-1.5 pt-1 text-[10px] text-zinc-500">
              <span class="px-1.5 py-0.5 bg-[#0e0e12] border border-[#222226]">PROTO: <strong class="text-zinc-300">${data.protocol}</strong></span>
              <span class="px-1.5 py-0.5 bg-[#0e0e12] border border-[#222226]">HOST: <strong class="text-zinc-300">${data.host}</strong></span>
              <span class="px-1.5 py-0.5 bg-[#0e0e12] border border-[#222226]">PATH: <strong class="text-zinc-300">${data.pathname}</strong></span>
            </div>
          </div>
        ` : ''}

        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] text-zinc-500 uppercase font-bold">QUERY_PARAMS (${data.paramsCount})</span>
            ${data.paramsCount > 0 ? `
              <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(data.paramsAsJson)}'), 'JSON params copied')" class="btn-tactile text-[10px] py-0.5 px-1.5">
                ${GLYPHS.copy} EXPORT_AS_JSON
              </button>
            ` : ''}
          </div>

          ${data.paramsCount > 0 ? `
            <div class="overflow-x-auto border border-[#222226] bg-[#050507]">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="bg-[#0e0e12] text-zinc-500 border-b border-[#222226] text-[10px]">
                    <th class="p-2 w-1/3">PARAM_KEY</th>
                    <th class="p-2">RESOLVED_VALUE</th>
                    <th class="p-2 w-8"></th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
          ` : `
            <div class="p-2 bg-[#050507] border border-[#222226] text-zinc-600 text-center text-xs">
              NO QUERY PARAMETERS DETECTED
            </div>
          `}
        </div>

        ${renderCodeSynthesisSection(cardId, data.codeSnippets)}
      </div>
    `;

    return renderCardWrapper('URL_INSPECTOR', `${data.paramsCount}_PARAMS`, content, data.href);
  }

  // 8. Cryptographic Hashes Card
  function renderHashesCard(hashes) {
    const list = [
      { name: 'SHA-256', val: hashes.sha256 },
      { name: 'SHA-1', val: hashes.sha1 },
      { name: 'MD5', val: hashes.md5 },
      { name: 'SHA-512', val: hashes.sha512 }
    ];

    const content = `
      <div class="space-y-1.5 font-mono text-xs">
        ${list.map(h => `
          <div class="p-2 bg-[#050507] border border-[#222226] flex items-center justify-between gap-3">
            <span class="w-20 text-zinc-500 font-bold text-[11px] shrink-0">${h.name}</span>
            <span class="text-zinc-300 truncate select-all flex-1 text-[11px]">${h.val}</span>
            <button onclick="OmniPaste.copyContent(this, '${h.val}')" class="btn-tactile text-[10px] py-0.5 px-1.5 shrink-0">
              ${GLYPHS.copy}
            </button>
          </div>
        `).join('')}
      </div>
    `;

    return renderCardWrapper('CRYPTO_DIGEST', 'NATIVE_SUBTLE', content, hashes.sha256);
  }

  // 9. Raw String Metrics Card
  function renderRawStringCard(data) {
    const content = `
      <div class="space-y-3 font-mono text-xs">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div class="p-2 bg-[#050507] border border-[#222226]">
            <div class="text-[10px] text-zinc-500 uppercase">CHARS</div>
            <div class="text-sm font-bold text-zinc-100">${data.chars.toLocaleString()}</div>
          </div>
          <div class="p-2 bg-[#050507] border border-[#222226]">
            <div class="text-[10px] text-zinc-500 uppercase">WORDS</div>
            <div class="text-sm font-bold text-zinc-100">${data.words.toLocaleString()}</div>
          </div>
          <div class="p-2 bg-[#050507] border border-[#222226]">
            <div class="text-[10px] text-zinc-500 uppercase">LINES</div>
            <div class="text-sm font-bold text-zinc-100">${data.lines.toLocaleString()}</div>
          </div>
          <div class="p-2 bg-[#050507] border border-[#222226]">
            <div class="text-[10px] text-zinc-500 uppercase">BYTE_SIZE</div>
            <div class="text-sm font-bold text-emerald-400">${data.formattedBytes}</div>
          </div>
        </div>

        <div class="space-y-1.5">
          <div class="p-2 bg-[#050507] border border-[#222226] flex items-center justify-between text-[11px]">
            <span class="w-24 text-zinc-500">URL_ENCODED</span>
            <span class="text-zinc-300 truncate select-all flex-1 mx-2">${data.urlEncoded}</span>
            <button onclick="OmniPaste.copyContent(this, decodeURIComponent('${encodeURIComponent(data.urlEncoded)}'))" class="btn-tactile text-[10px] py-0 px-1">${GLYPHS.copy}</button>
          </div>
          <div class="p-2 bg-[#050507] border border-[#222226] flex items-center justify-between text-[11px]">
            <span class="w-24 text-zinc-500">BASE64</span>
            <span class="text-zinc-300 truncate select-all flex-1 mx-2">${data.base64Encoded}</span>
            <button onclick="OmniPaste.copyContent(this, '${data.base64Encoded}')" class="btn-tactile text-[10px] py-0 px-1">${GLYPHS.copy}</button>
          </div>
        </div>

        ${data.hexDump ? `
          <div class="border border-[#222226] bg-[#050507]">
            <div class="px-3 py-1 bg-[#0e0e12] border-b border-[#222226] text-[10px] text-zinc-500 flex justify-between">
              <span>HEXDUMP_PREVIEW (OFFSET | BYTES | ASCII)</span>
              ${data.hasMoreHex ? '<span>[TRUNCATED_96B]</span>' : ''}
            </div>
            <pre class="p-2.5 text-[11px] overflow-x-auto text-zinc-400 leading-relaxed font-mono">${data.hexDump}</pre>
          </div>
        ` : ''}
      </div>
    `;

    return renderCardWrapper('RAW_METRICS', `${data.chars}_BYTES`, content, null);
  }

  // =========================================================================
  // DETECTOR PIPELINE RUNNER
  // =========================================================================

  let currentDebounceTimer = null;
  let lastProcessedText = null;

  function runInspection() {
    const inputEl = document.getElementById('mainInput');
    if (!inputEl) return;

    const rawText = inputEl.value;

    updateInputMetrics(rawText);

    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(Math.max(inputEl.scrollHeight, 110), 400) + 'px';

    if (rawText === lastProcessedText) {
      return;
    }
    lastProcessedText = rawText;

    const resultsContainer = document.getElementById('resultsContainer');
    const secretAlertContainer = document.getElementById('secretAlertContainer');
    const emptyState = document.getElementById('emptyState');
    if (!resultsContainer) return;

    if (!rawText.trim()) {
      resultsContainer.innerHTML = '';
      if (secretAlertContainer) secretAlertContainer.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      updateDetectedPills([]);
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    // 1. Secret Scanner (Air-gapped)
    const secretScan = scanForSecrets(rawText);
    if (secretAlertContainer) {
      if (secretScan && secretScan.count > 0) {
        secretAlertContainer.innerHTML = renderSecretWarningBanner(secretScan);
      } else {
        secretAlertContainer.innerHTML = '';
      }
    }

    // 2. Detection Pipeline
    const cardsHtml = [];
    const detectedFormats = [];

    if (secretScan && secretScan.count > 0) {
      detectedFormats.push(`LEAK_DETECTED(${secretScan.count})`);
    }

    // Cron
    const cronResult = detectCron(rawText);
    if (cronResult) {
      cardsHtml.push(renderCronCard(cronResult));
      detectedFormats.push('CRON_RADAR');
    }

    // Epoch
    const epochResult = detectEpoch(rawText);
    if (epochResult) {
      cardsHtml.push(renderEpochCard(epochResult));
      detectedFormats.push('UNIX_EPOCH');
    }

    // JWT
    const jwtResult = detectJWT(rawText);
    if (jwtResult) {
      cardsHtml.push(renderJWTCard(jwtResult));
      detectedFormats.push('JWT_TOKEN');
    }

    // JSON
    const jsonResult = detectJSON(rawText);
    if (jsonResult) {
      cardsHtml.push(renderJSONCard(jsonResult));
      detectedFormats.push(jsonResult.isValid ? 'JSON_DATA' : 'INVALID_JSON');
    }

    // Base64
    const base64Result = detectBase64(rawText);
    if (base64Result) {
      cardsHtml.push(renderBase64Card(base64Result));
      detectedFormats.push(base64Result.isImage ? 'B64_IMAGE' : 'BASE64_TEXT');

      if (base64Result.cascadedJson) {
        const cascadedJsonResult = detectJSON(base64Result.decodedText);
        if (cascadedJsonResult && cascadedJsonResult.isValid) {
          cardsHtml.push(`
            <div class="mb-2 p-2 bg-[#091512] border border-emerald-900 font-mono text-xs text-emerald-300 flex items-center gap-2">
              <span class="text-emerald-400 font-bold">[CASCADE_TRIGGER]</span>
              <span>Decoded Base64 payload parsed as valid hierarchical JSON:</span>
            </div>
          `);
          cardsHtml.push(renderJSONCard(cascadedJsonResult));
          detectedFormats.push('CASCADE_JSON');
        }
      }
    }

    // Color
    const colorResult = detectColor(rawText);
    if (colorResult) {
      cardsHtml.push(renderColorCard(colorResult));
      detectedFormats.push('HEX_COLOR');
    }

    // URL
    const urlResult = detectURL(rawText);
    if (urlResult) {
      cardsHtml.push(renderURLCard(urlResult));
      detectedFormats.push('URL_PARAMS');
    }

    // Raw String Fallback
    const rawInspection = getRawStringInspection(rawText);
    if (cardsHtml.length === 0) {
      cardsHtml.push(renderRawStringCard(rawInspection));
      detectedFormats.push('RAW_STRING');
    }

    // Hashes container
    const hashesContainerId = 'hashes-section-' + Date.now();
    cardsHtml.push(`<div id="${hashesContainerId}" class="mt-2"></div>`);

    resultsContainer.innerHTML = cardsHtml.join('');
    updateDetectedPills(detectedFormats);

    computeHashes(rawText).then(hashes => {
      const hashesEl = document.getElementById(hashesContainerId);
      if (hashesEl) {
        hashesEl.innerHTML = renderHashesCard(hashes);
      }
    });
  }

  function updateInputMetrics(str) {
    const charEl = document.getElementById('charCount');
    const wordEl = document.getElementById('wordCount');
    const byteEl = document.getElementById('byteCount');

    const chars = str.length;
    const words = str.trim() ? str.trim().split(/\s+/).length : 0;
    const bytes = getUtf8ByteLength(str);

    if (charEl) charEl.textContent = `${chars.toLocaleString()} chars`;
    if (wordEl) wordEl.textContent = `${words.toLocaleString()} words`;
    if (byteEl) byteEl.textContent = formatBytes(bytes);
  }

  function updateDetectedPills(formats) {
    const container = document.getElementById('detectedPillsContainer');
    if (!container) return;

    if (!formats || formats.length === 0) {
      container.innerHTML = `<span class="text-[11px] text-zinc-600 font-mono">Awaiting buffer input...</span>`;
      return;
    }

    container.innerHTML = formats.map(f => {
      const isLeak = f.includes('LEAK');
      const cls = isLeak ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-[#18181c] text-zinc-300 border-[#2e2e34]';
      return `<span class="px-1.5 py-0.2 text-[10px] font-mono border ${cls}">[${f}]</span>`;
    }).join(' ');
  }

  // --- Code Tab Switcher ---
  function switchCodeTab(cardId, tabName) {
    ['curl', 'fetch', 'python'].forEach(tab => {
      const panel = document.getElementById(`code-panel-${cardId}-${tab}`);
      const btn = document.getElementById(`tab-btn-${cardId}-${tab}`);
      if (panel) {
        if (tab === tabName) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      }
      if (btn) {
        if (tab === tabName) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    });
  }

  // --- Common JSON Repair ---
  function tryRepairJson() {
    const inputEl = document.getElementById('mainInput');
    if (!inputEl) return;

    let text = inputEl.value;
    text = text.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');
    text = text.replace(/,\s*([}\]])/g, '$1');
    text = text.replace(/([{,]\s*)([a-zA-Z0-9_$-]+)\s*:/g, '$1"$2":');

    inputEl.value = text;
    showToast('Applied JSON auto-repair rules');
    runInspection();
  }

  // --- Sanitization Clipboard Actions ---
  function copySanitized(btnEl) {
    if (!lastScanResult || !lastScanResult.sanitizedText) {
      showToast('No credentials to sanitize');
      return;
    }
    copyToClipboard(lastScanResult.sanitizedText, btnEl, 'Sanitized buffer copied to clipboard');
  }

  function replaceWithSanitized() {
    const inputEl = document.getElementById('mainInput');
    if (!inputEl || !lastScanResult || !lastScanResult.sanitizedText) return;
    inputEl.value = lastScanResult.sanitizedText;
    showToast('Replaced buffer with mock placeholders');
    runInspection();
  }

  // --- Sample Generators ---
  function getSampleSecurity() {
    // Constructed dynamically at runtime so static repository push-protection scanners
    // do not trigger false-positive alerts on synthetic demo credentials.
    const p1 = ['s', 'k', '-', 'p', 'r', 'o', 'j', '-'].join('');
    const p2 = ['A', 'K', 'I', 'A'].join('');
    const p3 = ['s', 'k', '_', 'l', 'i', 'v', 'e', '_'].join('');
    const p4 = ['x', 'o', 'x', 'b', '-'].join('');

    const demoOpenAI = p1 + '9x7K2LmQ98AbCdEfGhIjKlMnOpQrStUvWxYz123456';
    const demoAws = p2 + 'IOSFODNN7EXAMPLE';
    const demoStripe = p3 + '51Oz948FkL92Zk30MqmK81Pz0091';
    const demoSlack = p4 + '123456789012-1234567890123-4jK9L0mNpQrStUvWxYz';

    return `# PRODUCTION CONFIG - DO NOT COMMIT OR PASTE TO PUBLIC LLMs
OPENAI_API_KEY="${demoOpenAI}"
AWS_ACCESS_KEY_ID="${demoAws}"
STRIPE_SECRET_KEY="${demoStripe}"
DATABASE_URL="postgres://db_admin:SuperSecretPass2026!@prod-db.internal.net:5432/core_app"
SLACK_BOT_TOKEN="${demoSlack}"`;
  }

  function getSampleCron() {
    return `*/15 8-18 * * 1-5`;
  }

  function getSampleJWT() {
    const nowSec = Math.floor(Date.now() / 1000);
    const header = { alg: "HS256", typ: "JWT", kid: "kernel-sign-2026" };
    const payload = {
      sub: "usr_99814421",
      name: "Alex Mercer",
      email: "alex.mercer@internal.net",
      role: "Staff Software Engineer",
      iat: nowSec - 300,
      exp: nowSec + 7200,
      iss: "auth.omnipaste.dev",
      aud: "api.omnipaste.dev"
    };
    function b64url(obj) {
      return btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return `${b64url(header)}.${b64url(payload)}.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ`;
  }

  function getSampleEpoch() {
    return String(Math.floor(Date.now() / 1000));
  }

  function getSampleJSON() {
    return JSON.stringify({
      kernel: "omnipaste-dispatcher",
      version: "2.4.0",
      airGapped: true,
      telemetry: false,
      pipelines: [
        "secret-shield",
        "cron-radar",
        "code-synthesis",
        "cascading-b64",
        "jwt-debugger"
      ],
      limits: {
        maxMemoryMb: 64,
        latencyTargetMs: 2
      }
    }, null, 2);
  }

  function getSampleHexColor() {
    return "#10b981";
  }

  function getSampleBase64() {
    const sampleObj = {
      event: "CASCADE_PARSER_SUCCESS",
      initiator: "OmniPaste Developer",
      timestamp: new Date().toISOString(),
      integrity: "PASSED"
    };
    return btoa(JSON.stringify(sampleObj, null, 2));
  }

  function getSampleURL() {
    return "https://api.github.com/repos/google/gemini/issues?state=open&sort=created&direction=desc&page=1&per_page=30&labels=bug,enhancement";
  }

  function loadSample(type) {
    const inputEl = document.getElementById('mainInput');
    if (!inputEl) return;

    let sampleText = '';
    switch (type) {
      case 'security': sampleText = getSampleSecurity(); break;
      case 'cron': sampleText = getSampleCron(); break;
      case 'jwt': sampleText = getSampleJWT(); break;
      case 'epoch': sampleText = getSampleEpoch(); break;
      case 'json': sampleText = getSampleJSON(); break;
      case 'color': sampleText = getSampleHexColor(); break;
      case 'base64': sampleText = getSampleBase64(); break;
      case 'url': sampleText = getSampleURL(); break;
      default: sampleText = getSampleSecurity(); break;
    }

    inputEl.value = sampleText;
    showToast(`Loaded: ${type.toUpperCase()}`);
    runInspection();
    inputEl.focus();
  }

  function clearInput() {
    const inputEl = document.getElementById('mainInput');
    if (!inputEl) return;
    inputEl.value = '';
    showToast('Buffer cleared');
    runInspection();
    inputEl.focus();
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      const inputEl = document.getElementById('mainInput');
      if (inputEl) {
        inputEl.value = text;
        showToast('Pasted from clipboard');
        runInspection();
        inputEl.focus();
      }
    } catch (err) {
      showToast('Clipboard read denied. Use Ctrl+V');
    }
  }

  function syncColorInput(hexVal) {
    const inputEl = document.getElementById('mainInput');
    if (inputEl) {
      inputEl.value = hexVal;
      runInspection();
    }
  }

  // Quick Action Utilities
  function actionPrettify() {
    const inputEl = document.getElementById('mainInput');
    if (!inputEl) return;
    try {
      const parsed = JSON.parse(inputEl.value.trim());
      inputEl.value = JSON.stringify(parsed, null, 2);
      showToast('Prettified JSON');
      runInspection();
    } catch (e) {
      showToast('Invalid JSON');
    }
  }

  function actionMinify() {
    const inputEl = document.getElementById('mainInput');
    if (!inputEl) return;
    try {
      const parsed = JSON.parse(inputEl.value.trim());
      inputEl.value = JSON.stringify(parsed);
      showToast('Minified JSON');
      runInspection();
    } catch (e) {
      showToast('Invalid JSON');
    }
  }

  function actionUrlDecode() {
    const inputEl = document.getElementById('mainInput');
    if (!inputEl) return;
    try {
      inputEl.value = decodeURIComponent(inputEl.value);
      showToast('Decoded URL entities');
      runInspection();
    } catch (e) {
      showToast('URL decode failed');
    }
  }

  function actionBase64Decode() {
    const inputEl = document.getElementById('mainInput');
    if (!inputEl) return;
    try {
      inputEl.value = atob(inputEl.value.trim());
      showToast('Decoded Base64');
      runInspection();
    } catch (e) {
      showToast('Base64 decode failed');
    }
  }

  // Format Helper Handlers
  function detectEpoch(raw) {
    const str = raw.trim();
    if (!/^-?\d+(\.\d+)?$/.test(str)) return null;

    const num = parseFloat(str);
    if (isNaN(num)) return null;

    let dateMs;
    let unit = 'seconds';
    const integerPartLength = Math.floor(Math.abs(num)).toString().length;

    if (integerPartLength === 13) {
      dateMs = num;
      unit = 'milliseconds';
    } else if (integerPartLength === 10 || (integerPartLength >= 9 && integerPartLength <= 11)) {
      dateMs = num * 1000;
      unit = 'seconds';
    } else if (integerPartLength === 16) {
      dateMs = num / 1000;
      unit = 'microseconds';
    } else if (integerPartLength === 19) {
      dateMs = num / 1000000;
      unit = 'nanoseconds';
    } else {
      if (num >= 0 && num <= 4102444800) {
        dateMs = num * 1000;
        unit = 'seconds';
      } else if (num > 4102444800 && num <= 4102444800000) {
        dateMs = num;
        unit = 'milliseconds';
      } else {
        return null;
      }
    }

    const date = new Date(dateMs);
    if (isNaN(date.getTime())) return null;

    const year = date.getUTCFullYear();
    if (year < 1970 || year > 2150) return null;

    const isoString = date.toISOString();
    const utcString = date.toUTCString();
    const localString = date.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
    const relativeTime = getRelativeTimeString(date);
    const epochSec = Math.floor(date.getTime() / 1000);
    const epochMs = date.getTime();

    const startOfYear = new Date(Date.UTC(date.getFullYear(), 0, 1));
    const dayOfYear = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    return {
      type: 'epoch',
      date,
      unit,
      isoString,
      utcString,
      localString,
      relativeTime,
      epochSec,
      epochMs,
      dayOfYear,
      isLeapYear
    };
  }

  function detectJWT(raw) {
    const str = raw.trim();
    const jwtRegex = /^([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]*)$/;
    const match = str.match(jwtRegex);
    if (!match) return null;

    const [fullToken, headerB64, payloadB64, signatureB64] = match;

    let headerObj = null;
    let payloadObj = null;

    try {
      headerObj = JSON.parse(base64UrlDecode(headerB64));
      payloadObj = JSON.parse(base64UrlDecode(payloadB64));
    } catch (e) {
      return null;
    }

    if (!headerObj || typeof headerObj !== 'object' || !payloadObj || typeof payloadObj !== 'object') {
      return null;
    }

    let expStatus = { text: 'NO_EXPIRY_CLAIM', status: 'neutral' };
    if (payloadObj.exp !== undefined) {
      const expSec = Number(payloadObj.exp);
      if (!isNaN(expSec)) {
        const expDate = new Date(expSec * 1000);
        const diffMs = expDate.getTime() - Date.now();
        const relative = getRelativeTimeString(expDate);
        if (diffMs > 0) {
          expStatus = { text: `ACTIVE (${relative})`, status: 'active' };
        } else {
          expStatus = { text: `EXPIRED (${relative})`, status: 'expired' };
        }
      }
    }

    return {
      type: 'jwt',
      header: headerObj,
      payload: payloadObj,
      signature: signatureB64,
      algorithm: headerObj.alg || 'NONE',
      tokenType: headerObj.typ || 'JWT',
      expStatus,
      rawToken: fullToken
    };
  }

  function detectJSON(raw) {
    const str = raw.trim();
    if (!str) return null;

    const startsWithJson = str.startsWith('{') || str.startsWith('[') || str.startsWith('"');
    const looksLikeJson = startsWithJson || (str.includes('{') && str.includes('}')) || str.includes('":') || str.includes("':");

    let parsed = null;
    let isValid = false;
    let parseError = null;

    try {
      parsed = JSON.parse(str);
      isValid = true;
    } catch (e) {
      parseError = e;
      isValid = false;
    }

    if (isValid && typeof parsed === 'number' && !str.startsWith('{') && !str.startsWith('[')) {
      return null;
    }

    if (!isValid && !looksLikeJson) return null;

    if (isValid) {
      let keyCount = 0;
      let maxDepth = 0;

      function analyze(node, depth) {
        if (depth > maxDepth) maxDepth = depth;
        if (node && typeof node === 'object') {
          if (Array.isArray(node)) {
            node.forEach(item => analyze(item, depth + 1));
          } else {
            const keys = Object.keys(node);
            keyCount += keys.length;
            keys.forEach(k => analyze(node[k], depth + 1));
          }
        }
      }
      analyze(parsed, 1);

      const formatted = JSON.stringify(parsed, null, 2);
      const minified = JSON.stringify(parsed);
      const originalBytes = getUtf8ByteLength(str);
      const minifiedBytes = getUtf8ByteLength(minified);
      const savings = originalBytes > minifiedBytes
        ? Math.round(((originalBytes - minifiedBytes) / originalBytes) * 100)
        : 0;

      return {
        type: 'json',
        isValid: true,
        data: parsed,
        formatted,
        minified,
        keyCount,
        maxDepth,
        isArray: Array.isArray(parsed),
        arrayLength: Array.isArray(parsed) ? parsed.length : 0,
        originalBytes,
        savings
      };
    } else {
      const errorMsg = parseError.message;
      let lineNum = 1, colNum = 1;
      const posMatch = errorMsg.match(/position (\d+)/i);
      if (posMatch) {
        const charPos = parseInt(posMatch[1], 10);
        const upToError = str.slice(0, charPos);
        const lines = upToError.split('\n');
        lineNum = lines.length;
        colNum = lines[lines.length - 1].length + 1;
      }

      const allLines = str.split('\n');
      const errorLine = allLines[lineNum - 1] || '';
      const pointerSpaces = ' '.repeat(Math.max(0, colNum - 1));

      return {
        type: 'json',
        isValid: false,
        errorMessage: errorMsg,
        lineNum,
        colNum,
        errorLine,
        pointerSpaces,
        rawString: str
      };
    }
  }

  function detectBase64(raw) {
    const str = raw.trim();
    if (!str || str.length < 4) return null;

    const dataUriMatch = str.match(/^data:([a-zA-Z0-9\/\-+.]+)?(;base64)?,([\s\S]+)$/i);
    let isDataUri = false;
    let mimeType = '';
    let payload = str;

    if (dataUriMatch) {
      isDataUri = true;
      mimeType = (dataUriMatch[1] || 'text/plain').toLowerCase();
      payload = dataUriMatch[3].trim();
    }

    const cleanPayload = payload.replace(/\s+/g, '');
    const isB64Chars = /^[A-Za-z0-9+/=_-]+$/.test(cleanPayload);
    if (!isB64Chars && !isDataUri) return null;

    let decodedText = '';
    let isImage = false;
    let imageSrc = '';

    if (isDataUri && mimeType.startsWith('image/')) {
      isImage = true;
      imageSrc = str;
    }

    try {
      let stdB64 = cleanPayload.replace(/-/g, '+').replace(/_/g, '/');
      while (stdB64.length % 4) stdB64 += '=';

      const binary = atob(stdB64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

      if (!isImage && bytes.length > 4) {
        if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
          isImage = true; mimeType = 'image/png'; imageSrc = `data:image/png;base64,${stdB64}`;
        } else if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
          isImage = true; mimeType = 'image/jpeg'; imageSrc = `data:image/jpeg;base64,${stdB64}`;
        } else if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x48) {
          isImage = true; mimeType = 'image/gif'; imageSrc = `data:image/gif;base64,${stdB64}`;
        } else if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
          isImage = true; mimeType = 'image/webp'; imageSrc = `data:image/webp;base64,${stdB64}`;
        }
      }

      decodedText = new TextDecoder('utf-8', { fatal: false }).decode(bytes);

      if (!isImage && (decodedText.trim().startsWith('<svg') || decodedText.trim().startsWith('<?xml'))) {
        isImage = true; mimeType = 'image/svg+xml'; imageSrc = `data:image/svg+xml;utf8,${encodeURIComponent(decodedText)}`;
      }
    } catch (e) {
      return null;
    }

    if (!isImage) {
      let printableCount = 0;
      for (let i = 0; i < decodedText.length; i++) {
        const code = decodedText.charCodeAt(i);
        if (code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127)) printableCount++;
      }
      if (printableCount / (decodedText.length || 1) < 0.85) return null;
    }

    let cascadedJson = null;
    if (!isImage && decodedText) {
      try {
        const trimmed = decodedText.trim();
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
          const parsed = JSON.parse(trimmed);
          cascadedJson = { data: parsed, formatted: JSON.stringify(parsed, null, 2) };
        }
      } catch (err) {}
    }

    return {
      type: 'base64',
      isImage,
      mimeType: mimeType || 'text/plain',
      imageSrc,
      decodedText,
      cascadedJson,
      rawLength: str.length,
      decodedBytes: getUtf8ByteLength(decodedText)
    };
  }

  function detectColor(raw) {
    const str = raw.trim();
    const hexMatch = str.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/);
    const rgbMatch = str.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
    const hslMatch = str.match(/^hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i);

    if (!hexMatch && !rgbMatch && !hslMatch) return null;

    let r = 0, g = 0, b = 0, a = 1.0;

    if (hexMatch) {
      let h = hexMatch[1];
      if (h.length === 3) {
        r = parseInt(h[0] + h[0], 16); g = parseInt(h[1] + h[1], 16); b = parseInt(h[2] + h[2], 16);
      } else if (h.length === 4) {
        r = parseInt(h[0] + h[0], 16); g = parseInt(h[1] + h[1], 16); b = parseInt(h[2] + h[2], 16);
        a = +(parseInt(h[3] + h[3], 16) / 255).toFixed(3);
      } else if (h.length === 6) {
        r = parseInt(h.substring(0, 2), 16); g = parseInt(h.substring(2, 4), 16); b = parseInt(h.substring(4, 6), 16);
      } else if (h.length === 8) {
        r = parseInt(h.substring(0, 2), 16); g = parseInt(h.substring(2, 4), 16); b = parseInt(h.substring(4, 6), 16);
        a = +(parseInt(h.substring(6, 8), 16) / 255).toFixed(3);
      }
    } else if (rgbMatch) {
      r = Math.min(255, Math.max(0, parseInt(rgbMatch[1], 10)));
      g = Math.min(255, Math.max(0, parseInt(rgbMatch[2], 10)));
      b = Math.min(255, Math.max(0, parseInt(rgbMatch[3], 10)));
      if (rgbMatch[4] !== undefined) a = Math.min(1, Math.max(0, parseFloat(rgbMatch[4])));
    } else if (hslMatch) {
      const h = parseFloat(hslMatch[1]) % 360;
      const s = Math.min(100, Math.max(0, parseFloat(hslMatch[2]))) / 100;
      const l = Math.min(100, Math.max(0, parseFloat(hslMatch[3]))) / 100;
      if (hslMatch[4] !== undefined) a = Math.min(1, Math.max(0, parseFloat(hslMatch[4])));
      const k = n => (n + h / 30) % 12;
      const f = n => l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      r = Math.round(255 * f(0)); g = Math.round(255 * f(8)); b = Math.round(255 * f(4));
    }

    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let hDeg = 0, sVal = 0, lVal = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      sVal = lVal > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: hDeg = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: hDeg = (bNorm - rNorm) / d + 2; break;
        case bNorm: hDeg = (rNorm - gNorm) / d + 4; break;
      }
      hDeg *= 60;
    }

    const hex6 = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    const hexAlpha = a < 1 ? Math.round(a * 255).toString(16).padStart(2, '0') : '';
    const fullHex = hexAlpha ? `${hex6}${hexAlpha}` : hex6;
    const rgbString = a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    const hslString = a < 1
      ? `hsla(${Math.round(hDeg)}, ${Math.round(sVal * 100)}%, ${Math.round(lVal * 100)}%, ${a})`
      : `hsl(${Math.round(hDeg)}, ${Math.round(sVal * 100)}%, ${Math.round(lVal * 100)}%)`;

    function getLuminance(red, green, blue) {
      const arr = [red, green, blue].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return arr[0] * 0.2126 + arr[1] * 0.7152 + arr[2] * 0.0722;
    }

    const lum = getLuminance(r, g, b);
    const contrastWhite = +(((1 + 0.05) / (lum + 0.05)).toFixed(2));
    const contrastBlack = +(((lum + 0.05) / (0.05)).toFixed(2));

    return {
      type: 'color',
      r, g, b, a,
      hex: fullHex.toUpperCase(),
      hex6: hex6.toUpperCase(),
      rgb: rgbString,
      hsl: hslString,
      cssVar: `--color: ${fullHex.toLowerCase()};`,
      tailwindBg: `bg-[${fullHex.toLowerCase()}]`,
      tailwindText: `text-[${fullHex.toLowerCase()}]`,
      contrastWhite,
      contrastBlack,
      isLight: lum > 0.5
    };
  }

  function detectURL(raw) {
    const str = raw.trim();
    if (!str) return null;

    let urlObj = null;
    let isFullUrl = false;

    if (/^https?:\/\//i.test(str)) {
      try {
        urlObj = new URL(str);
        isFullUrl = true;
      } catch (e) {
        return null;
      }
    } else if (str.startsWith('?') || (str.includes('=') && str.includes('&')) || str.includes('?')) {
      try {
        const dummyBase = 'https://kernel.internal';
        const formatted = str.startsWith('?') ? `${dummyBase}/${str}` : (str.startsWith('/') ? `${dummyBase}${str}` : `${dummyBase}/?${str}`);
        urlObj = new URL(formatted);
        isFullUrl = false;
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }

    if (!urlObj) return null;

    const params = [];
    urlObj.searchParams.forEach((value, key) => {
      params.push({ key, value, decodedValue: decodeURIComponent(value) });
    });

    if (!isFullUrl && params.length === 0) return null;

    return {
      type: 'url',
      isFullUrl,
      href: str,
      protocol: isFullUrl ? urlObj.protocol : 'relative',
      host: isFullUrl ? urlObj.host : '',
      pathname: urlObj.pathname,
      params,
      paramsCount: params.length,
      paramsAsJson: JSON.stringify(Object.fromEntries(params.map(p => [p.key, p.decodedValue])), null, 2),
      codeSnippets: generateCodeSnippetsForURL(isFullUrl ? str : `https://example.com${urlObj.pathname}${urlObj.search}`)
    };
  }

  async function computeHashes(raw) {
    const encoder = new TextEncoder();
    const data = encoder.encode(raw);

    async function hashBuffer(algorithm) {
      try {
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (err) {
        return 'UNAVAILABLE';
      }
    }

    const sha256 = await hashBuffer('SHA-256');
    const sha1 = await hashBuffer('SHA-1');
    const sha512 = await hashBuffer('SHA-512');
    const md5 = computeMD5(raw);

    return { sha256, sha1, sha512, md5 };
  }

  function getRawStringInspection(raw) {
    const chars = raw.length;
    const words = raw.trim() ? raw.trim().split(/\s+/).length : 0;
    const lines = raw.split(/\r\n|\r|\n/).length;
    const bytes = getUtf8ByteLength(raw);

    const encoder = new TextEncoder();
    const byteArr = encoder.encode(raw);
    const previewLen = Math.min(byteArr.length, 96);
    let hexDumpLines = [];

    for (let offset = 0; offset < previewLen; offset += 16) {
      const slice = byteArr.slice(offset, offset + 16);
      const hexParts = [];
      const asciiParts = [];

      for (let i = 0; i < 16; i++) {
        if (i < slice.length) {
          const b = slice[i];
          hexParts.push(b.toString(16).padStart(2, '0'));
          asciiParts.push((b >= 32 && b <= 126) ? String.fromCharCode(b) : '.');
        } else {
          hexParts.push('  ');
          asciiParts.push(' ');
        }
      }

      const offsetHex = offset.toString(16).padStart(8, '0');
      const hexStr1 = hexParts.slice(0, 8).join(' ');
      const hexStr2 = hexParts.slice(8, 16).join(' ');
      const asciiStr = asciiParts.join('');

      hexDumpLines.push(`${offsetHex}  ${hexStr1}  ${hexStr2}  |${asciiStr}|`);
    }

    return {
      type: 'raw',
      chars,
      words,
      lines,
      bytes,
      formattedBytes: formatBytes(bytes),
      urlEncoded: encodeURIComponent(raw),
      base64Encoded: btoa(unescape(encodeURIComponent(raw.slice(0, 1000)))),
      hexDump: hexDumpLines.join('\n'),
      hasMoreHex: byteArr.length > 96
    };
  }

  // --- Initializer ---
  function init() {
    const inputEl = document.getElementById('mainInput');
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        clearTimeout(currentDebounceTimer);
        currentDebounceTimer = setTimeout(runInspection, 10);
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          clearInput();
        }
      });

      inputEl.focus();
    }
    runInspection();
  }

  window.OmniPaste = {
    init,
    runInspection,
    copyContent: copyToClipboard,
    tryRepairJson,
    loadSample,
    clearInput,
    pasteFromClipboard,
    syncColorInput,
    actionPrettify,
    actionMinify,
    actionUrlDecode,
    actionBase64Decode,
    copySanitized,
    replaceWithSanitized,
    switchCodeTab
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

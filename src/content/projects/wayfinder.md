---
title: Wayfinder
summary: A Chrome extension that turns "go/keyword" into your own personal go-link shortcuts, right in the address bar.
tags: [coding, personal]
repoUrl: https://github.com/hhunterr71/wayfinder
codeAvailable: true
order: 5
---

## Description

Large tech companies often have internal `go/keyword` link shortcuts — type `go/drive` in the address bar and you're redirected straight to a mapped destination. Wayfinder is a personal reimplementation of that idea as a Chrome extension: no server, no company intranet required, just your own link mappings synced across your devices via Chrome's storage.

Type `go/keyword` in the address bar and Wayfinder intercepts the navigation before it ever hits the network, redirecting you to the destination you've mapped. A full dashboard page lets you add, edit, search, and delete mappings, and the reserved keyword `go/links` always opens that dashboard.

## Code Sample

The interception relies on `webNavigation.onBeforeNavigate`, which fires before any DNS lookup or network request — so a `go/keyword` "navigation" never actually leaves the browser:

```js
chrome.webNavigation.onBeforeNavigate.addListener(
  async ({ tabId, url }) => {
    const parsed = new URL(url);
    const keyword = parsed.pathname.replace(/^\//, '').split('/')[0].toLowerCase().trim();

    if (!keyword || keyword === RESERVED_KEYWORD) {
      chrome.tabs.update(tabId, { url: chrome.runtime.getURL('dashboard.html') });
      return;
    }

    const links = await getLinks();

    if (links[keyword]) {
      chrome.tabs.update(tabId, { url: links[keyword] });
    } else {
      const dest = chrome.runtime.getURL('dashboard.html') + '?notfound=' + encodeURIComponent(keyword);
      chrome.tabs.update(tabId, { url: dest });
    }
  },
  { url: [{ hostEquals: 'go' }] }
);
```

## Methods and Tools

1. **Chrome Extension (Manifest V3):** a service-worker background script plus a standalone dashboard page, communicating only through `chrome.storage` events.
2. **Navigation Interception:** `chrome.webNavigation.onBeforeNavigate`, scoped to the `go` host, to redirect before any network request fires.
3. **Sync Storage:** `chrome.storage.sync` for cross-device persistence, with a lazy-populated in-memory cache invalidated via `storage.onChanged` — needed because Manifest V3 service workers get killed and respawned, so naive in-memory state doesn't survive on its own.
4. **No build step:** vanilla JS, HTML, and CSS — zero npm dependencies.

## Next Steps

1. Add import/export for link mappings, so a set of go-links can be shared or backed up outside Chrome sync.
2. Handle the edge case (called out in the README) where a corporate DNS setup or a non-Google default search engine causes `go/keyword` to be treated as a search query instead of a URL.

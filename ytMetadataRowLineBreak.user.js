// ==UserScript==
// @name         YouTube metadata row line break
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Insert a line break after the first span in each metadata row
// @match        https://www.youtube.com/*
// @downloadURL  https://raw.githubusercontent.com/neconohitomi/ytMetadataRowLineBreak/main/ytMetadataRowLineBreak.user.js
// @updateURL    https://raw.githubusercontent.com/neconohitomi/ytMetadataRowLineBreak/main/ytMetadataRowLineBreak.user.js
// @grant        none
// ==/UserScript==

(() => {
  "use strict";

  const process = (root = document) => {
    root.querySelectorAll(
      "div.ytLockupMetadataViewModelMetadata"
    ).forEach((container) => {
      const row = container.querySelector(
        "yt-content-metadata-view-model " +
        "div.ytContentMetadataViewModelMetadataRow"
      );

      if (!row) return;

      const firstSpan = row.querySelector("span");
      if (!firstSpan) return;

      // 同じ行への重複挿入を防ぐ
      if (firstSpan.nextElementSibling?.tagName === "BR") return;

      row.style.setProperty("flex-wrap", "wrap", "important");
      firstSpan.style.setProperty("flex-basis", "100%", "important");
      });
  };

  process();

  // YouTube が後から追加・更新する要素も処理
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          process(node);
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();

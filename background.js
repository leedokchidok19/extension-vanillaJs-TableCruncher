chrome.runtime.onInstalled.addListener(() => {
  // 아이콘 클릭 시 사이드패널이 열리도록 설정
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.contextMenus.create({
    id: "extractNumbers",
    title: "선택 영역에서 숫자 추출하기",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "extractNumbers") {
    // context invalidated 에러 방지를 위한 체크
    if (!chrome.runtime?.id) return;

    const numbers = info.selectionText.replace(/,/g, '').match(/-?\d+(\.\d+)?/g) || [];
    const numValues = numbers.map(Number);
    chrome.storage.local.set({ numList: numValues });
  }
});
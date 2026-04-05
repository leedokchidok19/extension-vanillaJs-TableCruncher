function extractAndSave(text) {
  // 확장 프로그램 컨텍스트가 유효한지 먼저 확인
  if (!chrome.runtime?.id) return; 
  if (!text || text.trim().length === 0) return;

  const cleanedText = text.replace(/,/g, ''); 
  const numbers = cleanedText.match(/-?\d+(\.\d+)?/g);

  if (numbers) {
    const numValues = numbers.map(Number);
    
    chrome.storage.local.set({ numList: numValues }, () => {
      // 팝업/사이드바에 알림 전송 (에러 발생 시 무시)
      chrome.runtime.sendMessage({ type: "REFRESH_LIST" }).catch(() => {
        // 사이드바가 닫혀있거나 컨텍스트가 끊긴 경우 조용히 처리
      });
    });
  }
}

document.addEventListener('mouseup', () => {
  setTimeout(() => {
    const selection = window.getSelection().toString().trim();
    if (selection) extractAndSave(selection);
  }, 100);
});

document.addEventListener('copy', () => {
  const selection = window.getSelection().toString().trim();
  extractAndSave(selection);
});
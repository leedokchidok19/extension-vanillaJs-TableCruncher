document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('numberList');
  const resultEl = document.getElementById('resultValue');

  // 리스트 UI 업데이트
  function renderList() {
    chrome.storage.local.get({ numList: [] }, (data) => {
      if (!data.numList || data.numList.length === 0) {
        listEl.innerHTML = "<li class='empty'>숫자를 드래그하거나 복사하세요.</li>";
        return;
      }
      listEl.innerHTML = data.numList.map(n => `<li>${n.toLocaleString()}</li>`).join('');
    });
  }

  // content.js로부터 데이터 갱신 신호 수신
  chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "REFRESH_LIST") {
      renderList();
    }
  });

  // 사칙연산 (VanillaJS reduce 활용)
  function calculate(operator) {
    chrome.storage.local.get({ numList: [] }, (data) => {
      const nums = data.numList;
      if (nums.length === 0) return;

      let res = nums[0];
      for (let i = 1; i < nums.length; i++) {
        switch(operator) {
          case '+': res += nums[i]; break;
          case '-': res -= nums[i]; break;
          case '*': res *= nums[i]; break;
          case '/': res = nums[i] !== 0 ? res / nums[i] : res; break;
        }
      }
      resultEl.innerText = res.toLocaleString(undefined, { maximumFractionDigits: 2 });
    });
  }

  // 버튼 이벤트 할당
  document.getElementById('btnSum').onclick = () => calculate('+');
  document.getElementById('btnSub').onclick = () => calculate('-');
  document.getElementById('btnMul').onclick = () => calculate('*');
  document.getElementById('btnDiv').onclick = () => calculate('/');
  
  document.getElementById('btnClear').onclick = () => {
    chrome.storage.local.set({ numList: [] }, renderList);
    resultEl.innerText = '0';
  };

  renderList(); // 초기 로드
});
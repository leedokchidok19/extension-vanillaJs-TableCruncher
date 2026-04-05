// 1. To-do 기능 (chrome.storage.local 사용하여 데이터 보존)
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// 데이터 로드
chrome.storage.local.get(['todos'], (res) => {
    if (res.todos) res.todos.forEach(renderTodo);
});

document.getElementById('add-todo').addEventListener('click', () => {
    const text = todoInput.value;
    if (!text) return;
    renderTodo(text);
    saveTodos();
    todoInput.value = '';
});

function renderTodo(text) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${text}</span> <button class="del-btn">X</button>`;
    li.querySelector('.del-btn').onclick = () => { li.remove(); saveTodos(); };
    todoList.appendChild(li);
}

function saveTodos() {
    const todos = Array.from(todoList.querySelectorAll('span')).map(s => s.innerText);
    chrome.storage.local.set({ todos });
}

// 2. 클립보드 가져오기 기능
document.getElementById('refresh-clipboard').addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        const list = document.getElementById('clipboard-list');
        const li = document.createElement('li');
        li.innerText = text.substring(0, 30) + (text.length > 30 ? '...' : '');
        li.onclick = () => navigator.clipboard.writeText(text); // 클릭 시 재복사
        list.prepend(li);
    } catch (err) {
        console.error("클립보드 접근 권한이 필요합니다.");
    }
});

// 3. 북마크 목록 (간이 트리맵)
chrome.bookmarks.getRecent(10, (bookmarks) => {
    const container = document.getElementById('bookmark-treemap');
    bookmarks.forEach(bm => {
        if (bm.url) {
            const a = document.createElement('a');
            a.className = 'treemap-item';
            a.href = bm.url;
            a.innerText = bm.title.substring(0, 10);
            container.appendChild(a);
        }
    });
});
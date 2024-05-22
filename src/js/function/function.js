/**
 * ToDoアプリの実装
 */
const todo = () => {
  /**
   * ToDoアイテムの入力欄
   * @type {HTMLInputElement}
   */
  const taskValue = document.getElementById('js-form-input');

  /**
   * ToDoアイテムのリスト要素を取得
   * @type {HTMLElement}
   */
  const taskList = document.getElementById('js-todo-list');

  /**
   * Todoアイテム数の表示要素を取得
   * @type {HTMLElement}
   */
  const todoItemCountElement = document.getElementById('js-todo-count');

  /**
   * 新しいToDoアイテムをリストに追加
   * @param {string} task 追加するタスク
   */
  const addTasks = (task) => {
    // 新しいリスト項目を作成
    const listItem = document.createElement('li');
    listItem.textContent = task;

    // 削除ボタン
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    listItem.appendChild(deleteButton);

    // 削除ボタンにクリックイベントを追加
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      deleteTasks(deleteButton);
    });

    // タスクリストに項目を追加
    taskList.appendChild(listItem);
    updateTaskCount();
  };

  /**
   * ToDoアイテムを削除
   * @param {HTMLButtonElement} deleteButton 
   */
  const deleteTasks = (deleteButton) => {
    // 削除ボタンのリストを取得
    const chosenTask = deleteButton.closest('li');
    // リストから項目を削除
    taskList.removeChild(chosenTask);
    updateTaskCount();
  };

  /**
   * 現在のToDoアイテム数を更新
   */
  const updateTaskCount = () => {
    // 現在のリスト項目数を取得
    const count = taskList.children.length;
    todoItemCountElement.textContent = `ToDoアイテム数: ${count}`;
  };

  document.getElementById('js-form').addEventListener('submit', (e) => {
    // 本来のsubmitイベントの動作を止める
    e.preventDefault();

    const task = taskValue.value.trim();
    if (task) {
      addTasks(task);
      taskValue.value = '';
    }
  });
}

export default todo;
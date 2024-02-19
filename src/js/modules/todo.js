import { TodoListModel } from "../model/_TodoListModel";
import { TodoItemModel } from "../model/_TodoItemModel";

/**
 * ToDoアプリの実装
 */

const todo = () => {
  /**
   * todoListModelの初期化
   */
  const todoListModel = new TodoListModel();

  /**
  * @type {Element} フォーム要素の取得
  */
  const formElement = document.querySelector("#js-form");

  /**
  * @type {Element} 入力欄要素の取得
  */
  const inputElement = document.querySelector("#js-form-input");

  /**
  * @type {Element} Todoリストのコンテナ要素の取得
  */
  const containerElement = document.querySelector("#js-todo-list");

  /**
  * @type {Element} Todoアイテム数の表示要素を取得
  */
  const todoItemCountElement = document.querySelector("#js-todo-count");

  /**
  * @type {number} 現在のアイテム数
  */
  let todoItemCount = 0;

  /**
   * Todoリストの表示を更新
   * TodoListModelの状態が変更された時に呼ばれるコールバック
   */
  todoListModel.onChange(() => {
    /**
    * @type {Element} Todoリストをまとめる、ul要素を格納する
    */
    const todoListElement = document.createElement('ul');
    // TodoItem要素を作成しulに追加
    const todoItems = todoListModel.getTodoItems();
    todoItems.forEach(item => {
      // TodoリストをまとめるList要素
      const todoItemElement = createTodoItemElement(item);
      todoListElement.appendChild(todoItemElement);
    });
    
    // Todoリストのコンテナ要素の中身を更新
    containerElement.innerHTML = '';
    containerElement.appendChild(todoListElement);

    // Todoアイテム数の更新
    todoItemCountElement.textContent = `ToDoアイテム数: ${todoListModel.getTotalCount()}`;
  });
  
  formElement.addEventListener("submit", (e) => {
    // 本来のsubmitイベントの動作を止める
    e.preventDefault();
    // 新しいTodoItemをTodoListへ追加する
    todoListModel.addTodo(new TodoItemModel({
      title: inputElement.value,
      completed: false
    }));
    // 入力欄をリセット
    inputElement.value = "";
  });

  function createTodoItemElement(item) {
    const todoItemElement = document.createElement('li');

    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.checked = item.completed;
    checkboxElement.addEventListener('change', () => {
      todoListModel.updateTodo({
        id: item.id,
        completed: checkboxElement.checked
      });
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = '削除';
    deleteButton.addEventListener('click', () => {
      todoListModel.deleteTodo(item.id);
    });

    const titleElement = document.createElement('span');
    titleElement.textContent = item.title;

    todoItemElement.appendChild(checkboxElement);
    todoItemElement.appendChild(titleElement);
    todoItemElement.appendChild(deleteButton);

    return todoItemElement;
  }
}

export default todo;

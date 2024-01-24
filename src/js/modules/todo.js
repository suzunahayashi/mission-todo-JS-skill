/**
 * ToDoアプリの実装
 */

const todo = () => {
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
  * @type {Element} Todoリストをまとめる、ul要素を格納する
  */
  const todoListElement = document.createElement('ul');

  /**
  * @type {number} 現在のアイテム数
  */
  let todoItemCount = 0;

  formElement.addEventListener("submit", (e) => {

    // 本来のsubmitイベントの動作を止める
    e.preventDefault();
    
    // 追加するTodoアイテムのli要素を作成
    const todoItemElement = document.createElement('li');
    todoItemElement.textContent = inputElement.value;

    // TodoアイテムをtodoListElementに追加
    todoListElement.appendChild(todoItemElement);

    // Todoリストのコンテナ要素の中身をTodoリストをまとめるlist要素で上書き
    containerElement.innerHTML = '';
    containerElement.appendChild(todoListElement);

    // Todoアイテム数の更新
    todoItemCount += 1;
    todoItemCountElement.textContent = `ToDoアイテム数: ${todoItemCount}`;

    // 入力欄をリセット
    inputElement.value = "";
  });
}

export default todo;

import todo from "../modules/todo.js";
import { EventEmitter } from "./_eventEmitter.js";

export class TodoListModel extends EventEmitter {
    #items;
    /**
     * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
     */
    constructor(items = []) {
        super();
        this.#items = items;
    }

    /**
     * TodoItemの合計個数を返す
     * @returns {number}
     */
    getTotalCount() {
        return this.#items.length;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns {TodoItemModel[]}
     */
    getTodoItems() {
        return this.#items;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
     * @param {Function} listener
     */
    onChange(listener) {
        this.addEventListener("change", listener);
    }

    /**
     * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
     */
    emitChange() {
        this.emit("change");
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem) {
        this.#items.push(todoItem);
        this.emitChange();
    }

    /**
     * 指定した`id`のTodoItemの`completed`を更新する
     * @param {object} updateData
     */
    updateTodo(updateData) {
        const todoItem = this.#items.find(item => item.id === updateData.id);
        if(todoItem) {
            todoItem.completed = updateData.completed;
            this.emitChange();
        }
    }

    /**
     * 指定したidのTodoItemを削除する
     * @param {number} id
     */
    deleteTodo(id) {
        this.#items = this.#items.filter(item => item.id !== id);
        this.emitChange();
    }
}

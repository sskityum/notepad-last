import $ from 'jquery'
import todoService from '../TodoService'
import {
    inputTodo,
    btnAddTodo,
    todoList,
    todoItem
} from '../constants'

export default class TodoForm{
    constructor(){
        this.bindInputTodo()
        this.renderTodoList(todoService.todoList, todoList)
    }

    renderTodoList(list, container){
        container.html('')
    
        list.map((todo, id) => {
            const todoComponent = todoItem(todo, id)
            container.html(container.html() + todoComponent)
        })
    
        $('button[data-type="status"]').click((e) => {
            const id = $(e.currentTarget).attr('data-id')
            const status = $(e.currentTarget).attr('data-status') === 'open' ? 'close' : 'open'
            
            this.renderTodoList(todoService.changeTodo(id, status), container)
        })
    
        $('button[data-type="remove"]').click((e) => {
            const id = $(e.currentTarget).attr('data-id')
            
            this.renderTodoList(todoService.removeTodo(id), container)
        })
    }

    bindInputTodo(){
        btnAddTodo.click(() => {
            const todoText = inputTodo.val()
    
            if(todoText.length > 0){
                this.renderTodoList(todoService.addTodo({
                    description:todoText,
                    status:'open'
                }), todoList)
    
                inputTodo.val('')
            }
        }) 
    }
}


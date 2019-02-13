import React, {Component} from 'react'
import axios from 'axios'


import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const Url = 'http://localhost:3003/api/todos'

export default class Todo extends Component  {
    constructor(props){
        super(props)
        this.state = {description: '', list: []}
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.refresh()
    }

    refresh(){
        axios.get(`${Url}?sort=-createdAt`)
            .then((resp)=> this.setState({...this.state, description: '', list: resp.data}))
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleRemove(todo){
        axios.delete(`${Url}/${todo._id}`)
            .then(()=> this.refresh())
    }
    handleAdd(){
        const description = this.state.description
        axios.post(Url, {description}).then((resp)=> this.refresh())
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm handleChange={this.handleChange} handleAdd={this.handleAdd} description={this.state.description}/>
                <TodoList list={this.state.list} handleRemove={this.handleRemove}/>
            </div>
        )
    }
}
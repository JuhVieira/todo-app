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
        this.handleSearch = this.handleSearch.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)

        this.refresh()
    }

    refresh(description = ''){
        console.log(description)
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${Url}?sort=-createdAt${search}`)
            .then((resp) => {
                console.log(resp)
                this.setState({...this.state, description:'', list: resp.data})
            })
        }

    handleSearch(){
        this.refresh(this.state.description)
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

    handleMarkAsDone(todo){
        console.log('done')
        axios.put(`${Url}/${todo._id}`, {...todo, done:true})
            .then(resp => this.refresh())
    }

    handleMarkAsPending(todo){
        console.log('pending')
        axios.put(`${Url}/${todo._id}`, {...todo, done:false})
            .then(resp => this.refresh())
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                    handleSearch={this.handleSearch}
                    handleChange={this.handleChange} 
                    handleAdd={this.handleAdd} 
                    description={this.state.description}/>
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}/>
            </div>
        )
    }
}
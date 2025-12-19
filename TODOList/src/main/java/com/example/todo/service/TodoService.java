package com.example.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todo.entity.Todo;
import com.example.todo.repository.TodoRepository;

@Service
public class TodoService {

	@Autowired 
	private TodoRepository tr;
	
	public List<Todo> getAll() {
		// TODO Auto-generated method stub
		return tr.findAll();
	}

	public Todo save(Todo todo) {
		// TODO Auto-generated method stub
		return tr.save(todo);
	}

	public Todo update(int id, Todo todo) {
		// TODO Auto-generated method stub
		Todo existingTodo = tr.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        existingTodo.setTitle(todo.getTitle());
        existingTodo.setDescription(todo.getDescription());
        existingTodo.setCompleted(todo.isCompleted());

        return tr.save(existingTodo);
	}

	public void delete(int id) {
		// TODO Auto-generated method stub
		tr.deleteById(id);
	}

}

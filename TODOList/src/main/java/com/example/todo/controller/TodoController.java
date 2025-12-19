package com.example.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.entity.Todo;
import com.example.todo.service.TodoService;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/getall")
    public List<Todo> getAllTodos() {
        return todoService.getAll();
    }

    @PostMapping("/saveTodo")
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.save(todo);
    }

    @PutMapping("/updatetodo/{id}")
    public Todo updateTodo(@PathVariable int id, @RequestBody Todo todo) {
        return todoService.update(id, todo);
    }

    @DeleteMapping("/deletetodo/{id}")
    public void deleteTodo(@PathVariable int id) {
        todoService.delete(id);
    }
}


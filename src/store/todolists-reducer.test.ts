import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodoListType} from '../App';

let todolistId1: string = v1();
let todolistId2: string = v1();
let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, AddTodolistAC("New Todolist"))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC('Hello', todolistId2 ));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe('Hello');
});

test('correct filter of todolist should be changed', () => {

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC("completed", todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("completed");
});




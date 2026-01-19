function TodoInput({ inputValue, onInputChange, onAddTodo }) {
  return (
    <div className="todo-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onAddTodo()}
        placeholder="輸入待辦資料"
      />
      <button onClick={onAddTodo}>新增</button>
    </div>
  );
}

export default TodoInput;

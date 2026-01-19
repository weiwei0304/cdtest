import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('應該顯示標題', () => {
    render(<App />);
    expect(screen.getByText('我的待辦事項')).toBeInTheDocument();
  });
  //  模擬使用者新增待辦事項
  it('應該可以新增待辦事項', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText('輸入待辦資料');
    const addButton = screen.getByText('新增');

    await user.type(input, '測試待辦事項');

    await user.click(addButton);
    expect(screen.getByText('測試待辦事項')).toBeInTheDocument();
  });

  // 測試使用者勾選待辦事項
  it('應該可以切換待辦事項完成狀態', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText('輸入待辦資料');
    const addButton = screen.getByText('新增');
    await user.type(input, '測試項目');
    await user.click(addButton);

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // 測試使用者刪除待辦事項
  it('應該可以刪除待辦事項', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText('輸入待辦資料');
    const addButton = screen.getByText('新增');
    await user.type(input, '要刪除的項目');
    await user.click(addButton);

    expect(screen.getByText('要刪除的項目')).toBeInTheDocument();

    const deleteButtons = screen.getAllByText('刪除');
    await user.click(deleteButtons[0]);
    expect(screen.queryByText('要刪除的項目')).not.toBeInTheDocument();
  });
});

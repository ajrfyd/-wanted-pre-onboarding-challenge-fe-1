export type TodoType = {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LocalTodoType = {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  done: boolean;
};

export type QueryReturnType = {
  data: TodoType[];
};


export type ColumnType = {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  images?: { url: string }[];
};

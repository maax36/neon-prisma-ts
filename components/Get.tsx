import { Item } from "@/components/Item";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type TodoItem = {
  id: number;
  text: string;
};

type GetProps = {
  onMutate: (mutate: (data?: TodoItem[]) => Promise<TodoItem[] | undefined>) => void;
  onDelete: (id: number) => void;
};

export function Get({ onMutate, onDelete }: GetProps) {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/todo",
    fetcher
  );

  onMutate(mutate);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <>
      <Item data={data} onDelete={onDelete} />
    </>
  );
}

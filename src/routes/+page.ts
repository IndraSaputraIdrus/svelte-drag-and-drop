import type { PageLoad } from "./$types";

export const prerender = true

type Todo = {
  id: number,
  name: string,
  done: boolean
}

export const load: PageLoad = () => {
  const todos: Todo[] = [
    { id: 1, name: "Belajar Svelte", done: false },
    { id: 2, name: "Belajar Auth", done: true },
    { id: 3, name: "Belajar Nextjs", done: false },
  ]

  return {
    todos
  }
}

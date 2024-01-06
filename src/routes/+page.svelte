<script lang="ts">
	import DoneIcon from '$lib/components/DoneIcon.svelte';
	import BookIcon from '$lib/components/BookIcon.svelte';
	import { draggable, dropzone } from '$lib/dnd';
	import type { PageData } from './$types';

	export let data: PageData;

	$: todoItem = data.todos.filter((item) => item.done === false);
	$: todoDone = data.todos.filter((item) => item.done === true);

	function handleDragOver(id: number, done: boolean) {
		const item = data.todos.find((item) => item.id === id);
		if (!item) return;
		item.done = done;
		data.todos = data.todos;
	}
</script>

<main>
	<div id="todoItem" use:dropzone={{ onDragOver: handleDragOver, done: false }} class="wrapper">
		<h1>
			<BookIcon />
			Todo
		</h1>
		<ul>
			{#each todoItem as todo}
				<li use:draggable={todo.id}>{todo.name}</li>
			{/each}
		</ul>
	</div>
	<div id="todoDone" use:dropzone={{ onDragOver: handleDragOver, done: true }} class="wrapper">
		<h1>
			<DoneIcon />
			Done
		</h1>
		<ul>
			{#each todoDone as todo}
				<li class="complete" use:draggable={todo.id}>{todo.name}</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	main {
		display: flex;
		width: 100%;
		gap: 1rem;
		padding: 2rem;
		align-items: flex-start;
		justify-content: conter;
	}

	h1 {
		margin: 0;
		display: flex;
		gap: 0.5rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	li {
		border: 1px solid #eaeaea;
		padding: 1rem;
		border-radius: 5px;
		cursor: pointer;
		transition: all 100ms ease-in-out;
		user-select: none;
	}

	li:hover {
		background-color: #e2e8f0;
	}

	.complete {
		background-color: lightgreen;
    color: gray 
	}

	.wrapper {
		background-color: white;
		padding: 1rem;
		width: 250px;
		border-radius: 10px;
	}

	:global(svg) {
		width: 30px;
	}

	.wrapper:global(.droppable) {
		outline: 2px solid red;
		outline-offset: 0.25rem;
	}

	.wrapper:global(.droppable) > * {
		pointer-events: none;
	}
</style>

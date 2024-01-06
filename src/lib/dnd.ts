// drag and drop action


export const draggable = (node: HTMLElement, data: number) => {

  let state = String(data)

  node.draggable = true
  node.style.cursor = "grab"

  function handleDragStart(event: DragEvent) {
    event.dataTransfer?.setData("text/plain", state)
  }

  node.addEventListener("dragstart", handleDragStart)

  return {
    update(data: string) {
      state = data
    },
    destroy() {
      node.removeEventListener("dragstart", handleDragStart)
    }
  }
}

type Options = {
  onDragOver: (id: number, done: boolean) => void
  done: boolean
}

export const dropzone = (node: HTMLElement, options: Options) => {

  const dragOverClass = "droppable"

  function handleDragEnter(event: DragEvent) {
    const targetElement = event.target as HTMLElement
    targetElement.classList.add(dragOverClass)
  }

  function handleDragLeave(event: DragEvent) {
    const targetElement = event.target as HTMLElement
    targetElement.classList.remove(dragOverClass)
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault()

    if (!event.dataTransfer) return
    event.dataTransfer.dropEffect = "move"
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault()
    if (!event.dataTransfer) return

    const data = event.dataTransfer.getData("text/plain")
    const targetElement = event.target as HTMLElement
    targetElement.classList.remove(dragOverClass)
    options.onDragOver(Number(data), options.done)
  }

  node.addEventListener("dragenter", handleDragEnter)
  node.addEventListener("dragleave", handleDragLeave)
  node.addEventListener("dragover", handleDragOver)
  node.addEventListener("drop", handleDrop)

  return {
    destroy() {
      node.removeEventListener("dragenter", handleDragEnter)
      node.removeEventListener("dragleave", handleDragLeave)
      node.removeEventListener("dragover", handleDragOver)
      node.removeEventListener("drop", handleDrop)
    }
  }
}

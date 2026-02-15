import { type SyntheticEvent, useEffect, useRef, useState } from "react"

interface NameDialogProps {
  isOpen: boolean
  onConfirm: (name: string) => void
  onCancel: () => void
  defaultValue?: string
}

export function NameDialog({
  isOpen,
  onCancel,
  onConfirm,
  defaultValue,
}: NameDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [value, setValue] = useState("")

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue ?? "")
    }
  }, [isOpen, defaultValue])

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const trimmed = value.trim()
    if (!trimmed) return

    onConfirm(trimmed)
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/50 rounded-lg shadow-xl p-0 w-[90%] sm:w-full  max-w-md max-h-[90vh] overflow-y-auto"
      onCancel={onCancel}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Nome do local</h2>

        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Ex: Casa, Trabalho..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!value.trim()}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar
          </button>
        </div>
      </form>
    </dialog>
  )
}

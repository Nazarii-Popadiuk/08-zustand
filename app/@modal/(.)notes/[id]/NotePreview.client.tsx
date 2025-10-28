'use client'

import { useQuery } from "@tanstack/react-query"
import { fetchNoteById } from "@/lib/api"
import NotesModal from "@/components/Modal/Modal"
import styles from '../../Modal.module.css'
import { useRouter } from "next/navigation"


type Props = {
    noteId: string;
  onClose?: () => void;
}

export default function NotePreviewClient({ noteId, onClose }: Props) {

  const router = useRouter()
  
  const handleClose = () => {
    if (onClose) {
    onClose()
    } else {
      router.back()
  }
}

    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', noteId],
      queryFn: () => fetchNoteById(noteId),
        refetchOnMount: false
    })

    if (isLoading) return <NotesModal onClose={handleClose}><p>Loading...</p></NotesModal>
    if (isError || !data) return <NotesModal onClose={handleClose}><p>Error loading note</p></NotesModal>
    
    return (
        <NotesModal onClose={handleClose}>
            <div className={styles.preview}>
        <h2>{data.title}</h2>
          <p>{data.content}</p>
          {data.tag && <p>Tag:{data.tag}</p>}
          {data.createdAt && (<p>Created:{" "}{ new Date(data.createdAt).toLocaleString()}</p>)}
      </div>
    </NotesModal>
    )

}
import { deleteNote } from '../../lib/api';
import type { Note } from '../../types/note';
import styles from './NoteList.module.css';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';


export interface NoteListProps {
    notes: Note[];
}


export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      setDeletingId(null)
    },
    onError: (error) => {
      console.error('Failed to delete the note:', error)
      setDeletingId(null)
    }
  })
  if (notes.length === 0) return null
  
  return (
    <ul className={styles.list}>
      {notes.map((note) =>
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button className={styles.button} onClick={() => mutate(note.id)} disabled={isPending && deletingId === note.id}>{isPending && deletingId === note.id ? 'Deleting...' : 'Delete'}</button>
          </div>
        </li>
      )}
    </ul>
  );
}
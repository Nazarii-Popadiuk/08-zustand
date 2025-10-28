"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import styles from "./NoteDetails.module.css"

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>()
  

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Some went wrong..</p>;


  return (
    <div className={styles.container}>
	<div className={styles.item}>
	  <div className={styles.header}>
          <h2>{note.title}</h2>
	  </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>{note.createdAt}</p>
	</div>
</div>

  );
};

export default NoteDetailsClient;

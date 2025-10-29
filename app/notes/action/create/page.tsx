import NoteForm from "@/components/NoteForm/NoteForm";
import styles from './CreateNote.module.css'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Page for creating new notes",
  openGraph: {
    title: "Create note",
    description: "Page for creating new notes",
    url: `https://solid-suns-happen.loca.lt/notes/action/create`,
    images: [{url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`, width: 1200,
          height: 630,
          alt: "Create note page",}]
  }
};

export default function CreateNote() {
    return (
    <main className={styles.main}>
  <div className={styles.container}>
    <h1 className={styles.title}>Create note</h1>
	   {<NoteForm />}
  </div>
</main>

)
}
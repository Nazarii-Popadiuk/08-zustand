import styles from "./layout.module.css"

type LayoutNotesProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function LayoutNotes({ children, sidebar }: LayoutNotesProps) {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.notesWrapper}>{children}</div>
    </section>
  );
}
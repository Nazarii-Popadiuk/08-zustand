import Link from 'next/link'
import styles from './SidebarNotes.module.css'

const tags = [

  { value: "Todo", label: "Todo" },
  { value: "Work", label: "Work" },
  { value: "Personal", label: "Personal" },
  { value: "Meeting", label: "Meeting" },
  { value: "Shopping", label: "Shopping" },
];

const SidebarNotes = () => {
    return (
 <ul className={styles.menuList}>
        <li className={styles.menuItem}>
        <Link href={`/notes/filter/all`} className={styles.menuLink}>
          All Notes
        </Link>
                </li>
                {tags.map(tag => (
                    <li key={tag.value} className={styles.menuItem}>
                    <Link href={`/notes/filter/${tag.value}`} className={styles.menuLink}>{tag.label}</Link>
                    </li>
                ))}
    </ul>

    )
}
export default SidebarNotes
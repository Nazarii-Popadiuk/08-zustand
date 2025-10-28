"use client"

import styles from './TagsMenu.module.css'
import Link from 'next/link'


type Props = {
    tags: string[]
    currentTag?: string
    onSelectedTag: (tag: string) => void
}

const TagsMenu = ({ tags }: Props) => {

    return (
    <div className={styles.menuContainer}>
  <button className={styles.menuButton}>
    Notes ▾
  </button>
    <ul className={styles.menuList}>
        <li className={styles.menuItem}>
        <Link href={`/notes/filter`} className={styles.menuLink}>
          All Notes
        </Link>
                </li>
                {tags.map(tag => (
                    <li key={tag} className={styles.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={styles.menuLink}>{tag}</Link>
                    </li>
                ))}
    </ul>
</div>

)
}
export default TagsMenu
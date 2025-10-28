import Link from "next/link"
import styles from "./Header.module.css"
import TagsMenu from "../TagsMenu/TagsMenu"

type Props = {
  tags?: string[];
  currentTag?: string;
  onSelectedTag?: (tag: string) => void
}

const Header = ({tags, onSelectedTag}: Props) => {
  
return (
  <header className={styles.header}>
    <Link href="/" aria-label="Home">
      NoteHub
    </Link>
    <nav aria-label="Main Navigation">
      <ul className={styles.navigation}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/notes/filter/all">Notes</Link>
        </li>
        <li>
          {tags && onSelectedTag && <TagsMenu tags={tags} onSelectedTag={onSelectedTag} />}
        </li>
      </ul>
    </nav>
  </header>
)
}
export default Header
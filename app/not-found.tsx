import { Metadata } from 'next';
import styles from './page.module.css'

export const metadata: Metadata = {
  title: "Not found page",
  description: "Unfortunately, there is no page you're looking for...",
  openGraph: {
    title: "Not found page",
    description: "Unfortunately, there is no page you're looking for...",
    url: `https://solid-suns-happen.loca.lt/not-found`,
    images: [{url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`, width: 1200,
          height: 630,
          alt: "Page is not found",}]
  }
};

const NotFound = () => {
    return (
        <>
        <h1 className={styles.title}>404 - Page not found</h1>
            <p className={styles.description}>Sorry, the page you are looking for does not exist.</p>
            </>
    )
}

export default NotFound;
"use client"

import styles from './page.module.css'
import NoteList from '../../../../components/NoteList/NoteList'
import Pagination from '../../../../components/Pagination/Pagination'
import SearchBox from '../../../../components/SearchBox/SearchBox'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes } from '../../../../lib/api'
import { useDebounce } from 'use-debounce'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Props = {
  tag?: string,
  
}

export default function Notes({tag}: Props) {
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);
    const [currentPage, setCurrentPage] = useState(1);


        useEffect(() => {
        setCurrentPage(1);
    }, [search, tag])

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', debouncedSearch, currentPage, tag],
        queryFn: () => fetchNotes(debouncedSearch, currentPage, tag),
        placeholderData: keepPreviousData,
    
    });


    const handlePageChange = (selectedPage: number) => {
        setCurrentPage(selectedPage);
    }


    return (
<div className={styles.app}>
    <header className={styles.toolbar}>
                {<SearchBox onChange={setSearch} />}
        {data && data.totalPages > 1 && (<Pagination pageCount={data.totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>)}
        <Link href="/notes/action/create" className={styles.button}>Create note +</Link>
            </header>
            {isLoading && <p className={styles.loader}>Loading...</p>}
            {isError && <p className={styles.error}>An error has happend...</p>}
            {data && data.notes && data.notes.length > 0 ? (<NoteList notes={data.notes} />) : (!isLoading && <p className={styles.noNotes}>No notes found</p>)}
            
            
</div>
    )
}

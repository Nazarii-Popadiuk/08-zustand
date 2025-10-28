import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import App from "./Notes.client";
import { Metadata } from "next";

type Props = {
    params:Promise<{slug: string[]}>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
const { slug } = await params
const tag = slug?.[0] && slug[0] !== "all" ? slug[0] : undefined;

  return {
    title: tag ? `Notes filtered by: ${tag}` : `Àll notes` ,
    description: tag ? `Browse notes filtered by: ${tag}` : `View all available notes`,
    openGraph: {
      title: tag ? `Notes filtered by: ${tag}` : `Àll notes` ,
    description: tag ? `Browse notes filtered by: ${tag}` : `View all available notes`,
      url: `https://notehub.com/notes/filter/${tag ?? "all"}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag ? `Notes filtered by: ${tag}` : `Àll notes`,
        },
      ],
      type: 'website',
    }
  }
}

export default async function Notes({ params }: Props) {
    const Params = await params
    const queryClient = new QueryClient();

const tag = Params.slug?.[0] && Params.slug[0] !== "all" ? Params.slug[0] : undefined;

    const search = '';
    const currentPage = 1;

    await queryClient.prefetchQuery({
        queryKey: ['notes', search, currentPage, tag],
        queryFn: () => fetchNotes(search, currentPage, tag )
    })


  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <App tag={tag} />
          </HydrationBoundary>
  );
}



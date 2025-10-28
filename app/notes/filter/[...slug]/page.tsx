import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import App from "./Notes.client";

type Props = {
    params:Promise<{slug: string[]}>
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



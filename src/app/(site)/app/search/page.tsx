import { LazyImage } from "@/components/feature/lazy-image"
import { getSuapabaseServerComponent } from "@/supabase/models/index.models"
import Link from "next/link"
import { SearchForm } from "./components/SearchForm/SearchForm"

interface SearchParams {
    search_query?: string
}

interface Props {
    searchParams: SearchParams
}

const SearchPage: React.FC<Props> = async ({ searchParams }) => {
    const supabase = getSuapabaseServerComponent()
    const searchValue = searchParams?.search_query ?? ''

    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .ilike('title', `%${searchValue}%`)
        .order('created_at', { ascending: false })

    return (
        <div className="w-full h-full flex min-h-screen">
            <div className="flex flex-col gap-2 w-full h-full min-h-screen p-2">
                <SearchForm defaultSearchValue={searchValue} />
                <div>
                    {(posts?.length != null) && (
                        <ul className="xl:grid flex flex-col gap-1 xl:grid-cols-2 xl:grid-rows-[repeat(auto-fill,_384px)]">
                            {posts.map((post) => (
                                <li key={post.id}>
                                    <Link href={`/app/post/${post.id}`}>
                                        <LazyImage
                                            src={post.asset_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover object-center"
                                            skeletonClassName="w-full h-full"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage
import { useEffect, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries/GetPosts";
import { PostType } from "../gql/graphql";
import PostFeed from "../components/PostFeed";

function Feed() {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const { data, error, fetchMore} = useQuery(GET_ALL_POSTS, {
        variables: {
            skip: 0,
            take: 2,
        }
    });

    const loadMorePosts = async () => {
        try{
            await fetchMore({
                variables: {
                    skip: data.getPosts.length || 0,
                    take: 2,
                }
            })
        } catch(error) {
            console.log("Error loading more posts");
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting){
                    loadMorePosts()
                }
            },
            {
                threshold: 1,
            }
        )
        if (loadMoreRef.current)
            observer.observe(loadMoreRef.current);
        return () => {
            if (loadMoreRef.current)
                observer.unobserve(loadMoreRef.current);
        }
    }, [loadMorePosts]);


    return (  
        <div>
            <MainLayout>
                <div className="pt-[80px] w-[calc(100%-90px)] max-w-[750px]">
                    {
                        data?.getPosts.map((post: PostType) => (
                            <PostFeed key={post.id} post={post} />
                        ))
                    }
                    <div className="h-20" ref={loadMoreRef}></div>
                </div>
            </MainLayout>
        </div>
    );
}
export default Feed;
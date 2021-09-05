import React from 'react'
import { useRef } from 'react'
import PostEntry from '$components/PostEntry.astro'
import getYear from '$utils/getYear'

export default function PostList({ posts, showYears = true }) {
    let year = useRef('')
    let postYear = useRef('')
    function setPostYear(date) {
        postYear.current = getYear(date)
    }
    function setYear(date) {
        year.current = getYear(date)
    }
    if (posts === 'undefined') return null
    if (!posts) {
        return (
            <div>No posts here</div>
        )
    }
    return (
        <>
            {posts.length}

            {JSON.stringify(posts[0])}
            {/* {posts &&

                posts.map((post, index) => (

                    <div key={index}>


                        {showYears && setPostYear(post.date)}

                        {showYears && year.current != postYear.current && (
                            <p className='mt-10 -mb-6 text-lg font-bold'>
                                {postYear.current}
                            </p>
                        )}

                        {showYears && setYear(post.date)}

                        <PostEntry post={post}></PostEntry>

                    </div>
                ))
            } */}
        </>
    );






    // return (

    //     <>

    //         {posts &&

    //             posts.map((post, index) => (

    //                 <div key={index}>


    //                     {showYears && setPostYear(post.date)}

    //                     {showYears && year.current != postYear.current && (
    //                         <p className='mt-10 -mb-6 text-lg font-bold'>
    //                             {postYear.current}
    //                         </p>
    //                     )}

    //                     {showYears && setYear(post.date)}

    //                     <PostEntry post={post}></PostEntry>

    //                 </div>
    //             ))
    //         }
    //     </>

    // )
};

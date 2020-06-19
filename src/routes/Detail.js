import React from 'react';
import { useParams } from "react-router-dom";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// Get data from GraphQL Server with Query
const GET_MOVIE = gql`
   query getMovie($id: Int!){
    movie(id:$id){
        title
        medium_cover_image
        language
        rating
        description_intro
    }
    suggestions(id:$id){
        id
        medium_cover_image
    }
   }
`;

export default () => {
    
    // Get Param 
    const { id } = useParams();
    
    // Hook
    const { loading, data } = useQuery( GET_MOVIE, {
        variables: { id: parseInt(id) }
    });
    console.log(data?.movie?.title);
    console.log(data?.suggestions);

    // Render
    return (
        <section>
            <div>
                <h1>{ loading ? "Loading..." : data?.movie?.title }</h1> 
                <h4>{ data?.movie?.language } / { data?.movie?.rating } </h4>
                <p>{ data?.movie?.description_intro }</p>
            </div>
            <img src={data && data.movie ? data.movie.medium_cover_image : ""} alt=""/>
            <div>
               {data?.suggestions.map(s_movie => (
                    <img src={s_movie.medium_cover_image} alt=""/>
                ))} 
            </div>
        </section>
    );
};
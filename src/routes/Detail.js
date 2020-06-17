import React from 'react';
import { useParams } from "react-router-dom";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// Get data from GraphQL Server with Query
const GET_MOVIE = gql`
   query getMovie($id: Int!){
    movie(id:$id){
        id
        title
        description_intro
        medium_cover_image
    }
   }
`;

export default () => {
    let { id } = useParams();
    id = parseInt(id);

    console.log(typeof id, id);

    const { loading, data, error } = useQuery( GET_MOVIE, {
        variables: { id }
    });

    if (loading) {
        return "loading";
    }
    
    if (data && data.movie) {
        return data.movie.title;
    }
};
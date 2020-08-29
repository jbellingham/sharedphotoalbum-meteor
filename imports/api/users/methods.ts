import gql from "graphql-tag";

export const GET_USER = gql`
    query getUser($userId: String) {
        getUser(userId: $userId) {
            name
            profilePicture {
                url
                width
                height
            }
        }
    }
`
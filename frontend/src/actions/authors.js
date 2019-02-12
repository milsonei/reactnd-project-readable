export const RECEIVE_AUTHORS = 'RECEIVE_AUTHORS'

export function receiveAuthors(authors){
    return {
        type: RECEIVE_AUTHORS,
        authors
    }
}

export default function getTmdbImageUrl(poster_path: string | null, size: number) {

    if(!poster_path){
        return null;
    }
    return `https://image.tmdb.org/t/p/w${size}${poster_path}`
}
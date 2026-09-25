
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export default async function tmdbFetch<T>(endpoint: string){

    const token = process.env.TMDB_API_READ_ACCESS_TOKEN;

        const response = await fetch(`${TMDB_BASE_URL}${endpoint}`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            }
            
        );
        
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();

        return data as T;

}
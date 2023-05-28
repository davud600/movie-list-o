import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useEffect,
} from "react";
import { api } from "./utils/api";

export const rating = (stars: NumberOfStars) =>
    "★★★★★☆☆☆☆☆".slice(5 - stars, 10 - stars);

export type NumberOfStars = 0 | 1 | 2 | 3 | 4 | 5;

export interface Movie {
    id: number;
    name: string;
    rating?: NumberOfStars;
    review?: string;
}

export const MoviesContext = createContext<MovieContextType>({
    moviesList: [],
    addMovieToList: () => [],
    updateMovieInList: () => [],
    removeMovieFromList: () => [],
    createMovieId: () => 0,
});

export function useMovies() {
    return useContext(MoviesContext);
}

export interface MovieContextType {
    moviesList: Movie[];
    addMovieToList: UpdateList;
    updateMovieInList: UpdateList;
    removeMovieFromList: UpdateList;
    createMovieId: () => number;
}

type UpdateList = (movie: Movie) => void;

const MoviesProvider = ({ children }: { children: ReactNode }) => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);

    const data = api.movies.getAll.useQuery();
    const addMovie = api.movies.addMovie.useMutation({
        onSuccess: async () => {
            await data.refetch();
        },
    });
    const updateMovie = api.movies.updateMovie.useMutation({
        onSuccess: async () => {
            await data.refetch();
        },
    });
    const deleteMovie = api.movies.deleteMovie.useMutation({
        onSuccess: async () => {
            await data.refetch();
        },
    });

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const list: Movie[] | undefined = data.data?.list;

        if (!!!list) return;

        setMoviesList(list);
    }, [data]);

    const createMovieId = () => {
        return moviesList.length + 1;
    };

    const addMovieToList: UpdateList = (movie: Movie) => {
        addMovie.mutate(movie);
    };

    const updateMovieInList: UpdateList = (movie: Movie) => {
        updateMovie.mutate(movie);
    };

    const removeMovieFromList: UpdateList = (movie: Movie) => {
        deleteMovie.mutate(movie);
    };

    const value: MovieContextType = {
        moviesList,
        addMovieToList,
        updateMovieInList,
        removeMovieFromList,
        createMovieId,
    };

    return (
        <MoviesContext.Provider value={value}>
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesProvider;

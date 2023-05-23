import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useEffect,
} from "react";

export interface Movie {
    name: string;
}

const list: Movie[] = [
    {
        name: "test",
    },
];

export const MoviesContext = createContext<MovieContextType>({
    moviesList: [...list],
    addMovieToList: () => list,
    removeMovieFromList: () => list,
});

export function useMovies() {
    return useContext(MoviesContext);
}

export interface MovieContextType {
    moviesList: Movie[];
    addMovieToList: UpdateList;
    removeMovieFromList: UpdateList;
}

type UpdateList = (movie: Movie) => void;

const MoviesProvider = ({ children }: { children: ReactNode }) => {
    const [moviesList, setMoviesList] = useState([...list]);

    useEffect(() => {
        const fetchMovieData = async () => {
            const res = await fetch("movies.json");
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const data = await res.json();

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            setMoviesList(data.list);
        };

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchMovieData();
    }, []);

    const addMovieToList: UpdateList = (movie: Movie) => {
        setMoviesList((prevMoviesList) => [movie, ...prevMoviesList]);
    };

    const removeMovieFromList: UpdateList = (movie: Movie) => {
        setMoviesList((prevMoviesList: Movie[]) =>
            prevMoviesList.filter(
                (listMovie: Movie) => listMovie.name != movie.name
            )
        );
    };

    const value: MovieContextType = {
        moviesList,
        addMovieToList,
        removeMovieFromList,
    };

    return (
        <MoviesContext.Provider value={value}>
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesProvider;

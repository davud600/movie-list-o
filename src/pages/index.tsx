import { type NextPage } from "next";
import Head from "next/head";
import {
    type MovieContextType,
    useMovies,
    type Movie,
    rating,
    type NumberOfStars,
} from ".././MoviesContext";
import {
    type Dispatch,
    type SetStateAction,
    useState,
    useRef,
    type ChangeEvent,
} from "react";
import { useOutsideClickDetector } from "~/utils/outsideClick";

interface MoviesListProps {
    moviesList: Movie[];
    openEditMoviePortal: (movie: Movie) => void;
    openDeleteMoviePortal: (movie: Movie) => void;
}

const MoviesList = ({
    moviesList,
    openEditMoviePortal,
    openDeleteMoviePortal,
}: MoviesListProps) => {
    return (
        <ul className="max-w-md list-inside list-disc space-y-7 text-lg text-neutral-200 md:text-xl">
            {moviesList.map((movie: Movie) => (
                <li key={movie.name} className="flex flex-col gap-1">
                    <div className="flex justify-between gap-3">
                        <button
                            onClick={() => openEditMoviePortal(movie)}
                            className="flex gap-2 text-start"
                        >
                            <span>•</span> {movie.name}{" "}
                            <svg
                                className="h-4 w-4 fill-white md:h-5 md:w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-3">
                            <span>{rating(movie.rating || 0)}</span>
                            <button
                                onClick={() => openDeleteMoviePortal(movie)}
                            >
                                <svg
                                    className="h-3 w-3 fill-neutral-500 transition-all hover:fill-neutral-300 md:h-4 md:w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <span className="text-sm text-neutral-400 md:text-base">
                        - {movie.review}
                    </span>
                </li>
            ))}
        </ul>
    );
};

const DeleteMoviePortal = ({
    setState,
    movie,
}: {
    setState: Dispatch<SetStateAction<boolean>>;
    movie: Movie;
}) => {
    const { removeMovieFromList } = useMovies();

    const deleteMoviePortalRef = useRef<HTMLDivElement>(null);

    useOutsideClickDetector(deleteMoviePortalRef, () => setState(false));

    return (
        <div
            ref={deleteMoviePortalRef}
            className="absolute left-1/2 top-1/2 z-20 -ml-[8.75rem] -mt-[8.75rem] h-[17.5rem] w-[17.5rem] rounded-sm border border-neutral-700 bg-neutral-900 shadow-[0_0_0_1000px_rgba(0,0,0,.3)] md:-ml-[15rem] md:-mt-[12.5rem] md:h-[30rem] md:w-[35rem]"
        >
            <div className="flex w-full justify-end p-2 md:p-5">
                <button onClick={() => setState(false)}>
                    <svg
                        className="h-4 w-4 fill-neutral-400 md:h-8 md:w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                    >
                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                </button>
            </div>
            <div className="-mt-2 flex w-full flex-col items-center justify-center gap-2 p-2 text-center md:mt-0 md:p-5">
                <span className="mb-20 text-base text-neutral-200 md:text-lg">
                    Are you sure you want to remove this movie?
                </span>

                <div className="flex w-full flex-col gap-4">
                    <button
                        onClick={() => {
                            removeMovieFromList(movie);
                            setState(false);
                        }}
                        className="w-full rounded-sm bg-green-700 py-2 text-base text-neutral-300 transition-all hover:bg-green-800 hover:text-neutral-200 md:py-3 md:text-lg"
                    >
                        Yes I&apos;m sure
                    </button>
                    <button
                        onClick={() => {
                            setState(false);
                        }}
                        className="w-full rounded-sm bg-blue-700 py-2 text-base text-neutral-300 transition-all hover:bg-blue-800 hover:text-neutral-200 md:py-3 md:text-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const EditMoviePortal = ({
    setState,
    movie,
}: {
    setState: Dispatch<SetStateAction<boolean>>;
    movie: Movie;
}) => {
    const [movieName, setMovieName] = useState<string>(movie.name);
    const [movieRating, setMovieRating] = useState<NumberOfStars | undefined>(
        movie.rating
    );
    const [movieReview, setMovieReview] = useState<string | undefined>(
        movie.review
    );

    const { updateMovieInList } = useMovies();
    const editMoviePortalRef = useRef<HTMLDivElement>(null);

    useOutsideClickDetector(editMoviePortalRef, () => setState(false));

    return (
        <div
            ref={editMoviePortalRef}
            className="absolute left-1/2 top-1/2 z-20 -ml-[8.75rem] -mt-[8.75rem] h-[17.5rem] w-[17.5rem] rounded-sm border border-neutral-700 bg-neutral-900 shadow-[0_0_0_1000px_rgba(0,0,0,.3)] md:-ml-[15rem] md:-mt-[12.5rem] md:h-[30rem] md:w-[35rem]"
        >
            <div className="flex w-full justify-end p-2 md:p-5">
                <button onClick={() => setState(false)}>
                    <svg
                        className="h-4 w-4 fill-neutral-400 md:h-8 md:w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                    >
                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                </button>
            </div>
            <div className="-mt-2 flex w-full flex-col items-center justify-center gap-2 p-2 text-center md:mt-0 md:p-5">
                <label
                    htmlFor="movieName"
                    className="text-base font-normal text-neutral-300 md:text-lg"
                >
                    Updated name
                </label>
                <input
                    required
                    type="text"
                    id="movieName"
                    name="movieName"
                    placeholder="Movie Name"
                    className="block w-full rounded-sm border border-gray-600 bg-gray-700 p-2 text-sm text-gray-400 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 md:mb-6 md:p-2.5"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    autoFocus={true}
                />
                <div className="flex items-end justify-center gap-2">
                    <div className="flex w-2/3 flex-col gap-1">
                        <label
                            htmlFor="movieName"
                            className="text-base font-normal text-neutral-300 md:text-lg"
                        >
                            Quick review of the movie (optional)
                        </label>
                        <input
                            type="text"
                            id="movieReview"
                            name="movieReview"
                            placeholder="Your Review..."
                            className="block w-full rounded-sm border border-gray-600 bg-gray-700 p-2 text-sm text-gray-400 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 md:mb-6 md:p-2.5"
                            value={movieReview}
                            onChange={(e) => setMovieReview(e.target.value)}
                        />
                    </div>
                    <div className="flex w-1/3 flex-col gap-1">
                        <label
                            htmlFor="movieRating"
                            className="text-base font-normal text-neutral-300 md:text-lg"
                        >
                            Movie rating x/5
                        </label>
                        <input
                            type="number"
                            id="movieRating"
                            name="movieRating"
                            min={0}
                            max={5}
                            className="block w-full rounded-sm border border-gray-600 bg-gray-700 p-2 text-sm text-gray-400 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 md:mb-6 md:p-2.5"
                            value={movieRating}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setMovieRating(
                                    e.target.value as unknown as NumberOfStars
                                )
                            }
                        />
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (!!!movieName) return;

                        updateMovieInList({
                            id: movie.id,
                            name: movieName,
                            rating: movieRating,
                            review: movieReview,
                        });
                        setState(false);
                    }}
                    className="w-full rounded-sm bg-green-700 py-2 text-base text-neutral-300 transition-all hover:bg-green-800 hover:text-neutral-200 md:py-3 md:text-lg"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

const AddMoviePortal = ({
    setState,
}: {
    setState: Dispatch<SetStateAction<boolean>>;
}) => {
    const [movieName, setMovieName] = useState<string>("");
    const [movieRating, setMovieRating] = useState<NumberOfStars>(0);
    const [movieReview, setMovieReview] = useState<string>("");

    const { addMovieToList, createMovieId } = useMovies();
    const addMoviePortalRef = useRef<HTMLDivElement>(null);

    useOutsideClickDetector(addMoviePortalRef, () => setState(false));

    return (
        <div
            ref={addMoviePortalRef}
            className="absolute left-1/2 top-1/2 z-20 -ml-[8.75rem] -mt-[8.75rem] h-[17.5rem] w-[17.5rem] rounded-sm border border-neutral-700 bg-neutral-900 shadow-[0_0_0_1000px_rgba(0,0,0,.3)] md:-ml-[15rem] md:-mt-[12.5rem] md:h-[30rem] md:w-[35rem]"
        >
            <div className="flex w-full justify-end p-2 md:p-5">
                <button onClick={() => setState(false)}>
                    <svg
                        className="h-4 w-4 fill-neutral-400 md:h-8 md:w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                    >
                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                </button>
            </div>
            <div className="-mt-2 flex w-full flex-col items-center justify-center gap-2 p-2 text-center md:mt-0 md:p-5">
                <label
                    htmlFor="movieName"
                    className="text-base font-normal text-neutral-300 md:text-lg"
                >
                    Enter Name of the movie you want to add
                </label>
                <input
                    required
                    type="text"
                    id="movieName"
                    name="movieName"
                    placeholder="Movie Name"
                    className="block w-full rounded-sm border border-gray-600 bg-gray-700 p-2 text-sm text-gray-400 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 md:mb-6 md:p-2.5"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    autoFocus={true}
                />
                <div className="flex items-end justify-center gap-2">
                    <div className="flex w-2/3 flex-col gap-1">
                        <label
                            htmlFor="movieName"
                            className="text-base font-normal text-neutral-300 md:text-lg"
                        >
                            Quick review of the movie (optional)
                        </label>
                        <input
                            type="text"
                            id="movieReview"
                            name="movieReview"
                            placeholder="Your Review..."
                            className="block w-full rounded-sm border border-gray-600 bg-gray-700 p-2 text-sm text-gray-400 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 md:mb-6 md:p-2.5"
                            value={movieReview}
                            onChange={(e) => setMovieReview(e.target.value)}
                        />
                    </div>
                    <div className="flex w-1/3 flex-col gap-1">
                        <label
                            htmlFor="movieRating"
                            className="text-base font-normal text-neutral-300 md:text-lg"
                        >
                            Movie rating x/5
                        </label>
                        <input
                            type="number"
                            id="movieRating"
                            name="movieRating"
                            min={0}
                            max={5}
                            className="block w-full rounded-sm border border-gray-600 bg-gray-700 p-2 text-sm text-gray-400 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 md:mb-6 md:p-2.5"
                            value={movieRating}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setMovieRating(
                                    e.target.value as unknown as NumberOfStars
                                )
                            }
                        />
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (!!!movieName) return;

                        addMovieToList({
                            id: createMovieId(),
                            name: movieName,
                            rating: movieRating,
                            review: movieReview,
                        });
                        setState(false);
                    }}
                    className="w-full rounded-sm bg-green-700 py-2 text-base text-neutral-300 transition-all hover:bg-green-800 hover:text-neutral-200 md:py-3 md:text-lg"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

const Home: NextPage = () => {
    const { moviesList }: MovieContextType = useMovies();

    const [addMoviePortalOpen, setAddMoviePortalOpen] =
        useState<boolean>(false);
    const [editMoviePortalOpen, setEditMoviePortalOpen] =
        useState<boolean>(false);
    const [deleteMoviePortalOpen, setDeleteMoviePortalOpen] =
        useState<boolean>(false);

    const [movieEditing, setMovieEditing] = useState<Movie>(
        moviesList[0] as Movie
    );
    const [movieDeleting, setMovieDeleting] = useState<Movie>(
        moviesList[0] as Movie
    );

    return (
        <>
            <Head>
                <title>Olsa&apos;s movie recommendations</title>
                <meta name="description" content="Generated by create-t3-app" />
                <meta
                    name="viewport"
                    content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
                ></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div id="stars"></div>
            {/* <div id="stars2"></div> */}
            {/* <div id="stars3"></div> */}

            {addMoviePortalOpen && (
                <AddMoviePortal setState={setAddMoviePortalOpen} />
            )}

            {editMoviePortalOpen && (
                <EditMoviePortal
                    setState={setEditMoviePortalOpen}
                    movie={movieEditing}
                />
            )}

            {deleteMoviePortalOpen && (
                <DeleteMoviePortal
                    setState={setDeleteMoviePortalOpen}
                    movie={movieDeleting}
                />
            )}

            <main className="flex min-h-screen flex-col items-center justify-start overflow-x-hidden px-3 md:px-6">
                <section className="flex h-full flex-col items-start justify-center gap-10 py-10 md:gap-14 md:py-14">
                    <h1 className="text-center text-xl font-black text-gray-200 md:text-3xl">
                        Welcome to Olsa&apos;s 🪐 movie recommendation list!
                    </h1>
                    <div className="flex h-full w-full flex-col items-center justify-center">
                        <div className="mb-8 flex w-full flex-col items-center justify-between gap-6 md:mb-10 md:flex-row">
                            <button
                                onClick={() => alert("🌷")}
                                className="flex items-center justify-center"
                            >
                                <span className="cursor-pointer text-base font-medium text-neutral-400 transition-all hover:text-neutral-200 md:text-lg">
                                    Nothing to see here <br></br>don&apos;t
                                    click this c:
                                </span>
                            </button>
                            <div className="hidden items-center justify-center md:flex">
                                <h2 className="text-lg font-bold text-neutral-300 md:text-xl">
                                    Total Movies: {moviesList.length}
                                </h2>
                            </div>
                            <button
                                onClick={() =>
                                    setAddMoviePortalOpen(
                                        (prevAddMoviePortalOpen: boolean) =>
                                            !prevAddMoviePortalOpen
                                    )
                                }
                                className="flex items-center justify-center"
                            >
                                <span className="flex cursor-pointer items-center justify-center gap-3 fill-neutral-400 text-base font-medium text-neutral-400 transition-all hover:fill-neutral-200 hover:text-neutral-200 md:gap-5 md:text-lg">
                                    Add movie to list{" "}
                                    <span>
                                        <svg
                                            className="h-4 w-4 md:h-5 md:w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                        </svg>
                                    </span>
                                </span>
                            </button>
                            <div className="flex items-center justify-center md:hidden">
                                <h2 className="text-lg font-bold text-neutral-300 md:text-xl">
                                    Total Movies: {moviesList.length}
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex h-full w-full items-center justify-center pb-[50rem] md:pb-96">
                    <MoviesList
                        moviesList={moviesList}
                        openEditMoviePortal={(movie) => {
                            setEditMoviePortalOpen(true);
                            setMovieEditing(movie);
                        }}
                        openDeleteMoviePortal={(movie) => {
                            setDeleteMoviePortalOpen(true);
                            setMovieDeleting(movie);
                        }}
                    />
                </section>
            </main>
        </>
    );
};

export default Home;

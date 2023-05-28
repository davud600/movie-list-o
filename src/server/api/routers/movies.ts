import * as fs from "fs";
import { type Movie } from "~/MoviesContext";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const moviesRouter = createTRPCRouter({
    getAll: publicProcedure.query(() => {
        const jsonString: string = fs.readFileSync("movies.json", "utf-8");

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { list }: { list: Movie[] } = JSON.parse(jsonString);

        return { list };
    }),

    addMovie: publicProcedure.mutation((req) => {
        const jsonString: string = fs.readFileSync("movies.json", "utf-8");

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let { list }: { list: Movie[] } = JSON.parse(jsonString);

        list = [req.rawInput as unknown as Movie, ...list];

        const json = JSON.stringify({ list });
        fs.writeFile("movies.json", json, "utf8", () => false);

        const addedMovie: Movie = req.rawInput as unknown as Movie;

        return { addedMovie };
    }),

    updateMovie: publicProcedure.mutation((req) => {
        const jsonString: string = fs.readFileSync("movies.json", "utf-8");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const movie = req.rawInput;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { list }: { list: Movie[] } = JSON.parse(jsonString);

        list.forEach((movieIt: Movie, index: number) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (movie.id === movieIt.id) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                list[index] = movie;
            }
        });

        const json = JSON.stringify({ list });
        fs.writeFile("movies.json", json, "utf8", () => false);

        const updatedMovie: Movie = movie as unknown as Movie;

        return { updatedMovie };
    }),

    deleteMovie: publicProcedure.mutation((req) => {
        const jsonString: string = fs.readFileSync("movies.json", "utf-8");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const movie = req.rawInput;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let { list }: { list: Movie[] } = JSON.parse(jsonString);

        list = list.filter(
            (movieIt: Movie) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                movie.id !== movieIt.id
        );

        const json = JSON.stringify({ list });
        fs.writeFile("movies.json", json, "utf8", () => false);

        const deletedMovie: Movie = movie as unknown as Movie;

        return { deletedMovie };
    }),
});

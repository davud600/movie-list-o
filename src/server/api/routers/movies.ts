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

    addMovie: publicProcedure.mutation(({ rawInput }: { rawInput: Movie }) => {
        const jsonString: string = fs.readFileSync("movies.json", "utf-8");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let { list }: { list: Movie[] } = JSON.parse(jsonString);

        const movie = rawInput as unknown as Movie;
        if (!!!movie) return;

        list = [movie as unknown as Movie, ...list];

        const json = JSON.stringify({ list });
        fs.writeFile("movies.json", json, "utf8", () => false);
    }),

    updateMovie: publicProcedure.mutation(
        ({ rawInput }: { rawInput: Movie }) => {
            const jsonString: string = fs.readFileSync("movies.json", "utf-8");
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { list }: { list: Movie[] } = JSON.parse(jsonString);

            const movie = rawInput as unknown as Movie;
            if (!!!movie) return;

            list.forEach((movieIt: Movie, index: number) => {
                if (movie.id === movieIt.id) {
                    list[index] = movie;
                }
            });

            const json = JSON.stringify({ list });
            fs.writeFile("movies.json", json, "utf8", () => false);
        }
    ),

    deleteMovie: publicProcedure.mutation(
        ({ rawInput }: { rawInput: Movie }) => {
            const jsonString: string = fs.readFileSync("movies.json", "utf-8");
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            let { list }: { list: Movie[] } = JSON.parse(jsonString);

            const movie = rawInput as unknown as Movie;
            if (!!!movie) return;

            list = list.filter((movieIt: Movie) => movie.id !== movieIt.id);

            const json = JSON.stringify({ list });
            fs.writeFile("movies.json", json, "utf8", () => false);
        }
    ),
});

import * as fs from "fs";
import { z } from "zod";
import { type Movie } from "~/MoviesContext";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const moviesRouter = createTRPCRouter({
    getAll: publicProcedure.query(() => {
        const jsonString: string = fs.readFileSync("movies.json", "utf-8");

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { list }: { list: Movie[] } = JSON.parse(jsonString);

        return { list };
    }),

    // addMovie: publicProcedure
    //     .input(
    //         z.object({
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //             movie,
    //         })
    //     )
    //     .query(({ input }) => {
    //         const jsonString: string = fs.readFileSync("movies.json", "utf-8");

    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //         let { list }: { list: Movie[] } = JSON.parse(jsonString);

    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //         list = [input.movie, ...list];

    //         const json = JSON.stringify({ list });
    //         fs.writeFile("movies.json", json, "utf8", () => false);

    //         return {
    //             list,
    //         };
    //     }),
});

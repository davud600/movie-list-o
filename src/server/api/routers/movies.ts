import * as fs from "fs";
import { type Movie } from "~/MoviesContext";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sql } from "@vercel/postgres";

export const moviesRouter = createTRPCRouter({
    getAll: publicProcedure.query(async () => {
        // const jsonString: string = fs.readFileSync("/movies.json", "utf-8");
        // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // const { list }: { list: Movie[] } = JSON.parse(jsonString);

        const { rows: list } = await sql`select * from movies;`;

        return { list };
    }),

    addMovie: publicProcedure.mutation(async ({ rawInput }: any) => {
        // const jsonString: string = fs.readFileSync("/movies.json", "utf-8");
        // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // let { list }: { list: Movie[] } = JSON.parse(jsonString);

        const movie = rawInput as unknown as Movie;
        if (!!!movie) return;

        // list = [movie as unknown as Movie, ...list];

        // const json = JSON.stringify({ list });
        // fs.writeFile("/movies.json", json, "utf8", () => false);

        await sql`insert into movies (name, rating, review) values (${movie.name}, ${movie.rating}, ${movie.review});`;
    }),

    updateMovie: publicProcedure.mutation(async ({ rawInput }: any) => {
        // const jsonString: string = fs.readFileSync("/movies.json", "utf-8");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // const { list }: { list: Movie[] } = JSON.parse(jsonString);

        const movie = rawInput as unknown as Movie;
        if (!!!movie) return;

        // list.forEach((movieIt: Movie, index: number) => {
        //     if (movie.id === movieIt.id) {
        //         list[index] = movie;
        //     }
        // });

        // const json = JSON.stringify({ list });
        // fs.writeFile("/movies.json", json, "utf8", () => false);

        await sql`UPDATE movies SET name = ${movie.name}, rating = ${movie.rating}, review = ${movie.review} WHERE id = ${movie.id};`;
    }),

    deleteMovie: publicProcedure.mutation(async ({ rawInput }: any) => {
        // const jsonString: string = fs.readFileSync("/movies.json", "utf-8");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // let { list }: { list: Movie[] } = JSON.parse(jsonString);

        const movie = rawInput as unknown as Movie;
        if (!!!movie) return;

        // list = list.filter((movieIt: Movie) => movie.id !== movieIt.id);

        // const json = JSON.stringify({ list });
        // fs.writeFile("/movies.json", json, "utf8", () => false);

        await sql`delete from movies where id = ${movie.id};`;
    }),
});

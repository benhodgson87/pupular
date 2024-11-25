import type { Context } from "https://edge.netlify.com";
import { createAnswers } from "./createAnswers.ts";

type Dog = {
  id: string;
  name: string;
  count: number;
  breeds: Record<string, number>;
  genders: Record<string, number>;
};

const ALLOWED_METHODS = ["GET", "POST"];

const GET = async () => {
  try {
    const dogs = (await fetch(
      `${Netlify.env.get("API_BASE_URL")}/data/dogs.json`,
      { cache: "force-cache" }
    ).then((res) => res.json())) as Array<Dog>;

    const randomIndex = Math.floor(Math.random() * dogs.length);

    const data = dogs[randomIndex];
    if (!data || Object.keys(data).length === 0) {
      throw new Error("No data returned from store");
    }

    console.log(
      `Retrieved random entry: ${data.id} (${String(data.name).toUpperCase()})`
    );

    const answers = createAnswers(Number(data.count));

    return Response.json(
      {
        id: data.id,
        name: data.name,
        answers,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=0, must-revalidate",
          "Netlify-CDN-Cache-Control": "public, max-age=1, must-revalidate",
        },
      }
    );
  } catch (e) {
    console.error(e);

    return Response.json(
      { error: "Internal Server Error", message: e },
      { status: 500 }
    );
  }
};

const POST = async (request: Request, context: Context) => {
  try {
    const dogs = (await fetch(
      `${Netlify.env.get("API_BASE_URL")}/data/dogs.json`
    ).then((res) => res.json())) as Array<Dog>;

    const id = context.params.id;
    if (!id || id.length === 0) {
      console.error("Missing ID parameter");

      return Response.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    const body = await request.json();
    if (!body.answer) {
      console.error("Missing answer value");

      return Response.json(
        { error: "Missing `answer` value" },
        { status: 400 }
      );
    }

    console.log(`Submitted Answer for ${id}: ${body.answer}`);

    const data = dogs.find((dog) => dog.id === id);

    if (!data || Object.keys(data).length === 0) {
      throw new Error("No data returned from store");
    }

    const count = Number(data.count);
    const correct = body.answer === count;

    return Response.json(
      {
        correct,
        count,
        name: data.name,
        genders: data.genders,
        breeds: data.breeds,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=0, must-revalidate",
          "Netlify-CDN-Cache-Control":
            "public, max-age=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (e) {
    console.error(e);

    return Response.json(
      { error: "Internal Server Error", message: e },
      { status: 500 }
    );
  }
};

export default async (request: Request, context: Context) => {
  if (!ALLOWED_METHODS.includes(request.method)) {
    console.error(
      `Request method must be one of ${ALLOWED_METHODS.join(", ")}.`,
      `Received ${request.method}.`
    );

    return Response.json(
      {
        error: `Request method must be one of ${ALLOWED_METHODS.join(
          ", "
        )}. Received ${request.method}.`,
      },
      { status: 405 }
    );
  }

  switch (request.method) {
    case "POST":
      return await POST(request, context);
    case "GET":
    default:
      return await GET();
  }
};

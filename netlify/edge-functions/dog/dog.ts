import { Redis } from "https://deno.land/x/upstash_redis@v1.3.2/mod.ts";
import type { Context } from "https://edge.netlify.com";
import { createAnswers } from "./createAnswers.ts";

const GET = async () => {
  try {
    const redis = Redis.fromEnv();

    const key = await redis.randomkey();
    if (!key) throw new Error("No key returned from `randomkey` request");

    const data = await redis.hgetall(key);
    if (!data || Object.keys(data).length === 0) {
      throw new Error("No data returned from store");
    }

    const answers = createAnswers(Number(data.count));

    return Response.json({
      id: key.replace(/^dog:/, ""),
      name: data.name,
      answers,
    });
  } catch (e) {
    console.error(e);

    return Response.json(
      { error: "Internal Server Error", message: e },
      { status: 500 },
    );
  }
};

const POST = async (request: Request, context: Context) => {
  try {
    const redis = Redis.fromEnv();

    const key = context.params.id;
    if (!key || key.length === 0) {
      console.error("Missing ID parameter");

      return Response.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    const body = await request.json();
    if (!body.answer) {
      console.error("Missing answer value");

      return Response.json(
        { error: "Missing `answer` value" },
        { status: 400 },
      );
    }

    const data = await redis.hgetall(`dog:${key}`);

    if (!data || Object.keys(data).length === 0) {
      throw new Error("No data returned from store");
    }

    const count = Number(data.count);
    const correct = body.answer === count;

    return Response.json({
      correct,
      count,
      name: data.name,
      genders: data.genders,
      breeds: data.breeds,
    });
  } catch (e) {
    console.error(e);

    return Response.json(
      { error: "Internal Server Error", message: e },
      { status: 500 },
    );
  }
};

export default async (request: Request, context: Context) => {
  if (!["GET", "POST"].includes(request.method)) {
    console.error("Request method must be GET or POST", request.method);

    return Response.json(
      { error: "Request method must be GET or POST" },
      { status: 405 },
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

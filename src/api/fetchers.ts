type DogResponse = {
  id: string;
  name: string;
  count: number;
  answers: Array<number>;
};

type AvatarResponse = {
  message: string;
  status: string;
};

type Response = DogResponse & { avatar?: AvatarResponse["message"] };

const BASE_URL =
  typeof process !== "undefined" && process.env?.API_BASE_URL
    ? process.env.API_BASE_URL
    : window.location.origin;

const fetchDogData = async (omitCount?: number): Promise<DogResponse> => {
  const uri = new URL("/api/dog", BASE_URL);
  if (omitCount) uri.searchParams.append("p", String(omitCount));

  return fetch(uri, {
    cache: "no-store",
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(`Failed retrieving data from ${BASE_URL}/api/dog`);
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

const fetchDogAvatar = async (): Promise<AvatarResponse> =>
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Failed retrieving avatar from dog.ceo/api");
    })
    .catch((e) => {
      console.error(e);

      const fallbackId = Math.floor(Math.random() * 6) + 1;
      const fallback = `/avatar-fallback/ai-fallback-${fallbackId}.png`;
      return {
        message: fallback,
        status: "fallback",
      };
    });

export const fetchDog = async (omitCount?: number): Promise<Response | null> =>
  Promise.all([fetchDogData(omitCount), fetchDogAvatar()])
    .then(([dog, picture]) => {
      return {
        ...dog,
        ...(picture && picture.message ? { avatar: picture.message } : {}),
      };
    })
    .catch((e) => {
      console.error(e);
      return null;
    });

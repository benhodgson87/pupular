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
  typeof process !== "undefined" && process.env?.DEPLOY_URL
    ? process.env.DEPLOY_URL
    : "";

const fetchDogData = async (): Promise<DogResponse> =>
  fetch(`${BASE_URL}/api/dog`, { cache: "no-store" })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      throw new Error(e);
    });

const fetchDogAvatar = async (): Promise<AvatarResponse> =>
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .catch(() => null);

export const fetchDog = async (): Promise<Response | null> =>
  Promise.all([fetchDogData(), fetchDogAvatar()])
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

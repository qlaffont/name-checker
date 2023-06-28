import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export type NPMResult = {
  name: string;
  isAvailable: boolean;
  url: string;
};

const dataSchema = z.object({
  name: z.string(),
});

const getNPMAvailibility = async (name: string) => {
  const npmResult: NPMResult = {
    name,
    isAvailable: false,
    url: `https://www.npmjs.com/package/${encodeURIComponent(name)}`,
  };

  try {
    // eslint-disable-next-line no-empty
    const res = await fetch(npmResult.url);

    if (res.status === 404) {
      npmResult.isAvailable = true;
    }
    // eslint-disable-next-line no-empty
  } finally {
  }

  return npmResult;
};

export default async function handler(req, res) {
  const reqData = dataSchema.safeParse(req.query);

  try {
    if (!reqData.success) {
      //@ts-ignore
      throw fromZodError(reqData.error);
    }
  } catch (error) {
    return res.status(400).json({ message: 'Bad Request', error: error.message });
  }

  const { data } = reqData;

  const result: NPMResult = await getNPMAvailibility(data.name);

  res.status(200).json({ data: result satisfies NPMResult });
}

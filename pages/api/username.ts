import { UsernameChecker } from 'username-checker';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

type PlatformResult = {
  // service: string;
  url: string;
  available?: boolean;
  reason?: string;
};

enum Service {
  Dailymotion = 'dailymotion',
  Facebook = 'facebook',
  GitHub = 'github',
  PayPal = 'paypal',
  Pinterest = 'pinterest',
  Product_Hunt = 'producthunt',
  Reddit = 'reddit',
  Slack = 'slack',
  TikTok = 'tiktok',
  Twitch = 'twitch',
  Twitter = 'twitter',
  WordPress = 'wordpress',
  Y_Combinator = 'ycombinator',
  YouTube = 'youtube',
}

const dataSchema = z.object({
  name: z.string(),
});

const usernameChecker = new UsernameChecker();

const getUsernameAvailability = async (service: Service, name: string) => {
  return (await usernameChecker.isAvailable(service, name)) satisfies PlatformResult;
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

  const result: PlatformResult[] = [];

  await Promise.all(
    Object.values(Service).map(async (service) => {
      result.push(await getUsernameAvailability(service, data.name));
    }),
  );

  res.status(200).json({ data: result satisfies PlatformResult[] });
}

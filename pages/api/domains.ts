import whoiser from 'whoiser';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

type DomainResult = {
  domainName: string;
  isTaken: boolean;
  createdDate?: Date;
  expiryDate?: string;
  registrar?: string;
};

const dataSchema = z.object({
  name: z.string(),
  domains: z
    .string()
    .transform((v) => JSON.parse(v))
    .pipe(z.string().array()),
});

const getDomainAvailability = async (domainName: string) => {
  const domainResult: DomainResult = {
    domainName,
    isTaken: false,
  };

  try {
    const whoisResult = await whoiser(domainName, { follow: 1 });

    //@ts-ignore
    const dataWhois = whoiser.firstResult(whoisResult);
    const firstTextLine = (dataWhois.text[0] || '').toLowerCase();

    let domainAvailability;
    if (firstTextLine.includes('reserved')) {
      domainAvailability = 'reserved';
    } else if (dataWhois['Domain Name'] && dataWhois['Domain Name'].toLowerCase() === domainName) {
      if (dataWhois['Domain Status'].includes('ACTIVE')) {
        domainAvailability = 'reserved';
      } else if (dataWhois['Domain Status'].includes('AVAILABLE')) {
        domainAvailability = 'available';
      } else {
        domainAvailability = 'registered';
      }
    } else if (firstTextLine.includes(`no match for "${domainName}"`)) {
      domainAvailability = 'available';
    } else {
      domainAvailability = 'available';
    }

    if (domainAvailability !== 'available') {
      domainResult.isTaken = true;
      domainResult.createdDate = dataWhois['Created Date'];
      domainResult.expiryDate = dataWhois['Expiry Date'];
      domainResult.registrar = dataWhois.Registrar;
    }
    // eslint-disable-next-line no-empty
  } finally {
  }

  return domainResult;
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

  const result: DomainResult[] = [];

  await Promise.all(
    data.domains.map(async (domainExt) => {
      const domainName = `${data.name}.${domainExt}`;

      result.push(await getDomainAvailability(domainName));
    }),
  );

  res.status(200).json(result satisfies DomainResult[]);
}

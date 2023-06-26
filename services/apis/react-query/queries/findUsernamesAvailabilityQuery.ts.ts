import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { PlatformResult } from '../../../../pages/api/usernames';
import { fetcher } from '../fetcher';

type Return = PlatformResult[];

export const findUsernamesAvailibilityQuery = (variables?: { name: string }): (() => Return) => {
  const url = `/api/usernames`;

  const searchParams = new URLSearchParams();
  searchParams.append('name', variables.name);

  //@ts-ignore
  return fetcher({
    method: 'GET',
    url: `${url}?${searchParams.toString()}`,
  });
};

export const useFindUsernamesAvailibilityQuery = (
  variables?: {
    name: string;
  },
  options?: UseQueryOptions<unknown, unknown, Return>,
) =>
  useQuery({
    queryKey: variables === undefined ? ['findDomainsAvailibility'] : ['findDomainsAvailibility', variables],
    queryFn: () => findUsernamesAvailibilityQuery(variables)(),
    ...options,
  });

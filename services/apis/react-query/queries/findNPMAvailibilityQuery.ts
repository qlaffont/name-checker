import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { NPMResult } from '../../../../pages/api/npmjs';
import { fetcher } from '../fetcher';

type Return = NPMResult;

export const findNPMsAvailibilityQuery = (variables?: { name: string }): (() => Return) => {
  const url = `/api/npmjs`;

  const searchParams = new URLSearchParams();
  searchParams.append('name', variables.name);

  //@ts-ignore
  return fetcher({
    method: 'GET',
    url: `${url}?${searchParams.toString()}`,
  });
};

export const useFindNPMsAvailibilityQuery = (
  variables?: {
    name: string;
  },
  options?: UseQueryOptions<unknown, unknown, Return>,
) =>
  useQuery({
    queryKey: variables === undefined ? ['findNPMsAvailibility'] : ['findNPMsAvailibility', variables],
    queryFn: () => findNPMsAvailibilityQuery(variables)(),
    ...options,
  });

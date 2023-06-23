import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { DomainResult } from '../../../../pages/api/domains';
import { fetcher } from '../fetcher';

type Return = DomainResult[];

export const findDomainsAvailibilityQuery = (variables?: { name: string; domains: string[] }): (() => Return) => {
  const url = `/api/domains`;

  const searchParams = new URLSearchParams();
  searchParams.append('name', variables.name);
  searchParams.append('domains', JSON.stringify(variables.domains));

  //@ts-ignore
  return fetcher({
    method: 'GET',
    url: `${url}?${searchParams.toString()}`,
  });
};

export const useFindDomainsAvailibilityQuery = (
  variables?: {
    name: string;
    domains: string[];
  },
  options?: UseQueryOptions<unknown, unknown, Return>,
) =>
  useQuery({
    queryKey: variables === undefined ? ['findDomainsAvailibility'] : ['findDomainsAvailibility', variables],
    queryFn: () => findDomainsAvailibilityQuery(variables)(),
    ...options,
  });

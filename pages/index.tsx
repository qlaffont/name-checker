import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '../components/atoms/Button';
import { FormDevTools } from '../components/atoms/FormDevTool';
import { Input } from '../components/atoms/Input';
import { useI18n } from '../i18n/useI18n';
import { useFindDomainsAvailibilityQuery } from '../services/apis/react-query/queries/findDomainsAvailibilityQuery';

const schema = z.object({
  name: z.string().min(3),
});

type SchemaType = z.infer<typeof schema>;

const Home = () => {
  const { t } = useI18n();

  const [resultName, setResultName] = useState<string>();

  const { data: dataDomains, isFetching: isLoadingDomains } = useFindDomainsAvailibilityQuery(
    {
      name: resultName,
      domains: ['fr', 'com', 'gg'],
    },
    { enabled: !!resultName },
  );

  const isLoading = useMemo(() => {
    return isLoadingDomains;
  }, [isLoadingDomains]);

  const {
    register,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = useCallback(() => {
    const { name } = getValues();

    setResultName(name);
  }, []);

  return (
    <div className="m-auto mt-12 max-w-[1000px] space-y-8 rounded-lg p-5 shadow-lg dark:shadow-white/50">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">{t('pages.home.title')}</h1>
        <p>{t('pages.home.description')}</p>
      </div>

      <div className="flex">
        <div className="flex-grow">
          <Input
            register={register('name')}
            placeholder={t('pages.home.searchPlaceholder')}
            className="!max-w-none"
            blockClassName="!border-r-0 !rounded-r-none"
            error={errors?.name}
          />
        </div>
        <div>
          <Button
            variant="info"
            className="rounded-l-none !px-4 !py-[0.56rem]"
            disabled={!isValid || isLoading}
            onClick={() => onSubmit()}
          >
            {t('pages.home.search')}
          </Button>
        </div>
      </div>

      <div className="text-center">
        <Link className="text-center underline hover:opacity-60" href="https://qlaffont.com">
          {t('pages.home.codedBy')}
        </Link>
      </div>

      {resultName && (
        <>
          <div className="w-full border-b border-zinc-900 dark:border-white"></div>

          <div className="space-y-5">
            <h2 className="text-lg font-bold">{t('pages.home.results.title', { name: resultName })}</h2>

            <div className="space-y-3">
              <h3 className="font-bold">{t('pages.home.results.domains')}</h3>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {dataDomains?.map((domainResult) => {
                  const isAvailable = domainResult.isTaken === false;

                  return (
                    <Link
                      key={domainResult.domainName}
                      href={`https://${domainResult.domainName}`}
                      target="_blank"
                      className="dark:shadow-sm/50 flex items-center gap-2 rounded-md border p-3 shadow-sm hover:opacity-60 dark:border-white"
                    >
                      <div className={clsx('rounded-full p-1', isAvailable ? 'bg-green-900/30 ' : 'bg-red-900/30')}>
                        <i className="icon icon-check block h-6 w-6 bg-green-200"></i>
                      </div>

                      <div className={clsx(isAvailable ? '' : 'line-through opacity-60')}>
                        {domainResult.domainName}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      <FormDevTools control={control} />
    </div>
  );
};

export default Home;

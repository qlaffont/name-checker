import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '../components/atoms/Button';
import { FormDevTools } from '../components/atoms/FormDevTool';
import { Input } from '../components/atoms/Input';
import { SEO } from '../components/atoms/SEO';
import { Switch } from '../components/atoms/Switch';
import { useI18n } from '../i18n/useI18n';
import { useFindDomainsAvailibilityQuery } from '../services/apis/react-query/queries/findDomainsAvailibilityQuery';
import { useFindNPMsAvailibilityQuery } from '../services/apis/react-query/queries/findNPMAvailibilityQuery';
import { useFindUsernamesAvailibilityQuery } from '../services/apis/react-query/queries/findUsernamesAvailabilityQuery.ts';
import { useDark } from '../services/useDark';
import { Service } from './api/usernames';

const schema = z.object({
  name: z.string().min(3),
});

type SchemaType = z.infer<typeof schema>;

const ServiceAvailibility = ({
  service,
  isAvailable,
  url,
  type,
  t,
}: {
  service: Service | string;
  isAvailable: boolean;
  url: string;
  type: string;
  t;
}) => {
  return (
    <Link
      href={url || ''}
      target="_blank"
      className="dark:shadow-sm/50 rounded-md border p-3 shadow-sm hover:opacity-60 dark:border-white"
    >
      <div className="flex h-full items-center justify-between">
        <div className="flex h-full items-center gap-2">
          <div
            className={clsx(
              'rounded-full p-1',
              isAvailable ? 'bg-green-900 dark:bg-green-900/30 ' : 'bg-red-900 dark:bg-red-900/30',
            )}
          >
            <i
              className={clsx('icon block h-6 w-6', isAvailable ? 'icon-check bg-green-200' : 'icon-close bg-red-200')}
            ></i>
          </div>

          <div>
            <div className={clsx(isAvailable ? '' : 'line-through opacity-60')}>
              {
                //@ts-ignore
                t(`pages.home.results.${type}.${service}`)
              }
            </div>
          </div>
        </div>

        <div>
          <i className="icon icon-external block h-4 w-4 bg-black dark:bg-white"></i>
        </div>
      </div>
    </Link>
  );
};

export enum Section {
  DOMAIN = 'domain',
  SOCIAL = 'social',
  MEDIA = 'media',
  PRO = 'pro',
  DEV = 'dev',
}

const Home = () => {
  const { t, format, actualLang, changeLang } = useI18n();

  const { toggle, isDarkMode } = useDark();

  const [resultName, setResultName] = useState<string>();
  const [activeSection, setActiveSection] = useState<Section>(Section.DOMAIN);
  const { value: isFullDisplayed, setValue: setIsFullDisplayed } = useBoolean();

  const { data: dataDomains, isFetching: isLoadingDomains } = useFindDomainsAvailibilityQuery(
    {
      name: resultName,
      domains: ['fr', 'com', 'gg', 'io', 'xyz', 'net', 'info', 'us', 'org'],
    },
    //@ts-ignore
    { enabled: !!resultName },
  );

  const { data: dataUsernames, isFetching: isLoadingUsernames } = useFindUsernamesAvailibilityQuery(
    {
      name: resultName,
    },
    //@ts-ignore
    { enabled: !!resultName },
  );

  const { data: dataNPM, isFetching: isLoadingNPM } = useFindNPMsAvailibilityQuery(
    {
      name: resultName,
    },
    //@ts-ignore
    { enabled: !!resultName },
  );

  const getUsernameAvailabilityByPlatform = useCallback(
    (service: Service) => {
      return dataUsernames?.find((v) => v.service === service);
    },
    [dataUsernames],
  );

  const isLoading = useMemo(() => {
    return isLoadingDomains || isLoadingUsernames || isLoadingNPM;
  }, [isLoadingDomains, isLoadingUsernames, isLoadingNPM]);

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

  const isSectionDisplay = useCallback(
    (sectionName) => {
      if (isFullDisplayed) {
        return true;
      }

      return activeSection === sectionName;
    },
    [isFullDisplayed, activeSection],
  );

  return (
    <div className="m-auto mb-6 mt-12 max-w-[1000px] space-y-8 rounded-lg p-5 shadow-lg dark:shadow-white/50">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">{t('pages.home.title')}</h1>
        <p>{t('pages.home.description')}</p>
      </div>

      <div className="block space-y-2 md:flex md:space-y-0">
        <div className="flex-grow">
          <Input
            register={register('name')}
            placeholder={t('pages.home.searchPlaceholder')}
            className="!max-w-none"
            blockClassName="md:!border-r-0 md:!rounded-r-none"
            error={errors?.name}
          />
        </div>
        <div>
          <Button
            variant="info"
            className="w-full !px-4 !py-[0.56rem] md:w-auto md:rounded-l-none"
            disabled={!isValid || isLoading}
            isLoading={isLoading}
            onClick={() => onSubmit()}
          >
            {t('pages.home.search')}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center divide-x dark:divide-white">
        <div className="w-fit cursor-pointer px-2 hover:opacity-60" onClick={() => toggle()}>
          {isDarkMode ? (
            <i className="icon icon-sun block h-4 w-4 bg-black dark:bg-white"></i>
          ) : (
            <i className="icon icon-moon block h-4 w-4 bg-black dark:bg-white"></i>
          )}
        </div>

        <div
          className="w-fit cursor-pointer px-2 hover:opacity-60"
          onClick={() => changeLang(actualLang === 'fr' ? 'en' : 'fr')}
        >
          {t('pages.home.language')}
        </div>
      </div>

      <div className="text-center">
        <Link className="text-center underline hover:opacity-60" href="https://github.com/qlaffont/name-checker">
          {t('pages.home.codedBy')}
        </Link>
      </div>

      {resultName && (
        <>
          <div className="w-full border-b border-zinc-900 dark:border-white"></div>

          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold">{t('pages.home.results.title', { name: resultName })}</h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {isLoading && (
                  <div>
                    <i className="icon icon-refresh block h-6 w-6 animate-spin bg-black dark:bg-white"></i>
                  </div>
                )}

                <div>
                  <Switch checked={isFullDisplayed} onClick={() => setIsFullDisplayed((v) => !v)} />
                </div>
              </div>
            </div>

            {!isFullDisplayed && (
              <>
                <div className="mx-auto flex w-auto items-center gap-3 overflow-auto md:w-fit">
                  {Object.values(Section).map((sectionName) => (
                    <div key={sectionName}>
                      <div
                        onClick={() => {
                          setActiveSection(sectionName);
                        }}
                        className={clsx(
                          'cursor-pointer rounded-lg px-4 py-1 hover:opacity-60',
                          sectionName === activeSection ? 'bg-black text-white dark:bg-white dark:text-black' : '',
                        )}
                      >
                        {t(`pages.home.results.sections.${sectionName}`)}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="space-y-3">
              {isSectionDisplay(Section.DOMAIN) && (
                <>
                  <div className="flex gap-2">
                    <div>
                      <h3 className="font-bold">{t('pages.home.results.domains')}</h3>
                    </div>

                    <div>
                      {isLoadingDomains && (
                        <i className="icon icon-refresh block h-6 w-6 animate-spin bg-black dark:bg-white"></i>
                      )}
                    </div>
                  </div>

                  <div className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {dataDomains
                      ?.sort((a, b) => a.domainName.localeCompare(b.domainName))
                      .map((domainResult) => {
                        const isAvailable = domainResult.isTaken === false;

                        return (
                          <Link
                            key={domainResult.domainName}
                            href={`https://${domainResult.domainName}`}
                            target="_blank"
                            className="dark:shadow-sm/50 rounded-md border p-3 shadow-sm hover:opacity-60 dark:border-white"
                          >
                            <div className="flex h-full items-center justify-between">
                              <div className="flex h-full items-center gap-2">
                                <div
                                  className={clsx(
                                    'rounded-full p-1',
                                    isAvailable
                                      ? 'bg-green-900 dark:bg-green-900/30 '
                                      : 'bg-red-900 dark:bg-red-900/30',
                                  )}
                                >
                                  <i
                                    className={clsx(
                                      'icon block h-6 w-6',
                                      isAvailable ? 'icon-check bg-green-200' : 'icon-close bg-red-200',
                                    )}
                                  ></i>
                                </div>

                                <div>
                                  <div className={clsx(isAvailable ? '' : 'line-through opacity-60')}>
                                    {domainResult.domainName}
                                  </div>
                                  {domainResult.registrar && (
                                    <p className="text-xs line-clamp-1">{domainResult.registrar}</p>
                                  )}
                                  {domainResult.expiryDate && (
                                    <p className="text-xs line-clamp-1">
                                      {t('pages.home.results.expiration', {
                                        date: format(new Date(domainResult.expiryDate), 'P'),
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div>
                                <i className="icon icon-external block h-4 w-4 bg-black dark:bg-white"></i>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </>
              )}

              {isSectionDisplay(Section.SOCIAL) && (
                <>
                  <h3 className="font-bold">{t('pages.home.results.socialNetworks.title')}</h3>

                  {dataUsernames && (
                    <div className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {[Service.Facebook, Service.Reddit, Service.TikTok, Service.Twitter].map((service) => (
                        <ServiceAvailibility
                          url={getUsernameAvailabilityByPlatform(service)?.url}
                          isAvailable={getUsernameAvailabilityByPlatform(service)?.available}
                          service={service}
                          key={service}
                          t={t}
                          type={'socialNetworks'}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {isSectionDisplay(Section.MEDIA) && (
                <>
                  <h3 className="font-bold">{t('pages.home.results.mediaPlatforms.title')}</h3>

                  {dataUsernames && (
                    <div className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {[Service.Dailymotion, Service.Twitch, Service.YouTube].map((service) => (
                        <ServiceAvailibility
                          url={getUsernameAvailabilityByPlatform(service)?.url}
                          isAvailable={getUsernameAvailabilityByPlatform(service)?.available}
                          service={service}
                          key={service}
                          t={t}
                          type={'mediaPlatforms'}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {isSectionDisplay(Section.PRO) && (
                <>
                  <h3 className="font-bold">{t('pages.home.results.proPlatforms.title')}</h3>

                  {dataUsernames && (
                    <div className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {[Service.Product_Hunt, Service.Slack, Service.WordPress, Service.Y_Combinator].map((service) => (
                        <ServiceAvailibility
                          url={getUsernameAvailabilityByPlatform(service)?.url}
                          isAvailable={getUsernameAvailabilityByPlatform(service)?.available}
                          service={service}
                          key={service}
                          t={t}
                          type={'proPlatforms'}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {isSectionDisplay(Section.DEV) && (
                <>
                  <h3 className="font-bold">{t('pages.home.results.devPlatforms.title')}</h3>

                  <div className="grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {dataUsernames &&
                      [Service.GitHub, Service.Gitlab].map((service) => (
                        <ServiceAvailibility
                          url={getUsernameAvailabilityByPlatform(service)?.url}
                          isAvailable={getUsernameAvailabilityByPlatform(service)?.available}
                          service={service}
                          key={service}
                          t={t}
                          type={'devPlatforms'}
                        />
                      ))}

                    {dataNPM && (
                      <ServiceAvailibility
                        url={dataNPM.url}
                        isAvailable={dataNPM.isAvailable}
                        service={'npmjs'}
                        t={t}
                        type={'devPlatforms'}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      <FormDevTools control={control} />
      <SEO title={t('pages.home.title')} description={t('pages.home.description')} />
    </div>
  );
};

export default Home;

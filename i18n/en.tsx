import { Service } from '../pages/api/usernames';

const lng = {
  navbar: {},
  components: {
    form: {
      save: 'Send',
      add: 'Add',
      delete: 'Delete',
      cancel: 'Cancel',
      confirm: 'Confirm',
      search: 'Search',
    },
    atoms: {
      alert: {
        wip: 'This feature is under development !',
        info: 'Info',
        error: 'Error',
        success: 'Success',
        changesSaved: 'Changes have been saved.',
        errorTryLater: 'An error has occurred. Please try again later !',
        copied: 'The text has been copied !',
        close: 'Close',
        back: 'Back',
        next: 'Next',
      },
      select: {
        noOptions: 'No element',
        loading: 'Loading',
      },
    },
  },
  pages: {
    home: {
      title: 'Name checker',
      description: 'With this tool you can check if your name is available on domain names and on social networks !',
      search: 'Validate my name',
      searchPlaceholder: 'Please insert a name',
      codedBy: 'Coded by Quentin Laffont',
      language: 'Français',
      results: {
        title: 'Results for "{{name}}"',
        expiration: 'Expiry on {{date}}',
        domains: 'Domains',
        socialNetworks: {
          title: 'Social Networks',
          [Service.Facebook]: 'Facebook',
          [Service.Reddit]: 'Reddit',
          [Service.TikTok]: 'Tiktok',
          [Service.Twitter]: 'Twitter',
          instagram: 'Instagram',
        },
        mediaPlatforms: {
          title: 'Media Platforms',
          [Service.Dailymotion]: 'Dailymotion',
          [Service.Twitch]: 'Twitch',
          [Service.YouTube]: 'Youtube',
          kick: 'Kick',
        },
        proPlatforms: {
          title: 'Pro Platforms',
          [Service.GitHub]: 'GitHub',
          [Service.Product_Hunt]: 'Product Hunt',
          [Service.Slack]: 'Slack',
          [Service.WordPress]: 'WordPress',
          [Service.Y_Combinator]: 'Y Combinator',
        },
      },
    },
  },
};

export default lng;

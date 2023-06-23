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
      results: {
        title: 'Results for "{{name}}" :',
        domains: 'Domains',
        socialNetworks: {
          title: 'Social Networks',
          facebook: 'Facebook',
          twitter: 'Twitter',
          instagram: 'Instagram',
          titkok: 'Tiktok',
        },
        mediaPlatforms: {
          title: 'Media Platforms',
          twitch: 'Twitch',
          youtube: 'Youtube',
          kick: 'Kick',
        },
      },
    },
  },
};

export default lng;

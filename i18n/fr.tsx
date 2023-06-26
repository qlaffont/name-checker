import enDict from './en';

const lng: typeof enDict = {
  navbar: {},
  components: {
    form: {
      save: 'Envoyer',
      add: 'Ajouter',
      delete: 'Supprimer',
      cancel: 'Annuler',
      confirm: 'Confimer',
      search: 'Rechercher',
    },
    atoms: {
      alert: {
        wip: 'Cette fonctionalité est en cours de développement !',
        info: 'Info',
        error: 'Erreur',
        success: 'Succès',
        changesSaved: 'Les modifications ont été sauvegardées.',
        errorTryLater: 'Une erreur est survenue. Veuillez réessayer plus tard !',
        copied: 'Le texte a été copié !',
        close: 'Fermer',
        back: 'Retour',
        next: 'Suivant',
      },
      select: {
        noOptions: 'Aucun élement',
        loading: 'Chargement',
      },
    },
  },
  pages: {
    home: {
      title: 'Vérificateur de nom',
      description:
        'Avec cet outil, vous pouvez vérifier si votre nom est disponible sur les noms de domaine et sur les réseaux sociaux !',
      search: 'Valider mon nom',
      searchPlaceholder: 'Veuillez insérer un nom',
      codedBy: 'Codé par Quentin Laffont',
      results: {
        title: 'Résultats pour "{{name}}"',
        expiration: 'Expire le {{date}}',
        domains: 'Noms de domaine',
        socialNetworks: {
          title: 'Réseaux sociaux',
          facebook: 'Facebook',
          twitter: 'Twitter',
          instagram: 'Instagram',
          titkok: 'Tiktok',
        },
        mediaPlatforms: {
          title: 'Plateformes multimédias',
          twitch: 'Twitch',
          youtube: 'Youtube',
          kick: 'Kick',
        },
      },
    },
  },
};

export default lng;

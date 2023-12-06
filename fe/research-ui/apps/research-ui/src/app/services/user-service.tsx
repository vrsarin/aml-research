import Keycloak from 'keycloak-js';

const _kc = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'aml',
  clientId: 'aml',
});

const initKeycloak = (onAuthenticatedCallback: () => void) => {
  _kc
    .init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
      // checkLoginIframe: true,
      flow: 'implicit',
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.log('user is not authenticated..!');
        _kc.login();
      }
      onAuthenticatedCallback();
    })
    .catch((response) => {
      console.error(response.data);
    });
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (
  successCallback:
    | ((value: boolean) => boolean | PromiseLike<boolean>)
    | null
    | undefined
) => _kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username ?? '';

const hasRole = (roles: any[]) =>
  roles.some((role: string) => _kc.hasRealmRole(role));

export const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
};

export default UserService;

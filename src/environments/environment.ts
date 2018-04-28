// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  //Cognito 관련
  region: 'ap-northeast-2',
  IdentityPoolId: '',
  UserPoolId: 'ap-northeast-1_d8o3MPLxxx',
  ClientId: '6svcu5kpgu7oklm5rdqufqxxxxx',

  //서버주소
  apiUrl: 'http://example.com/api/'
};

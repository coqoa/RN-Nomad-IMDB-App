import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    //사용중인 Theme을 작성해주면 됨
		mainBgColor: string;
		textColor: string;	
  }
}
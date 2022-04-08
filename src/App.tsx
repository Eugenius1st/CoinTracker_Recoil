import { createGlobalStyle } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function App() {
  const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500&family=Bebas+Neue&family=Black+Han+Sans&family=Do+Hyeon&family=Source+Sans+Pro:wght@300;400&family=Ubuntu+Mono:ital@1&display=swap');
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul, li {
  list-style: none;

}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Source Sans Pro', sans-serif;
  //현재 App은 Theme안에 있으므로 Theme의 props에 접근 가능한 상태이다.
  //그 말은 즉슨 이렇게 쓸 수 있다는 뜻이다
  background-color: ${(props) => props.theme.bgColor};
  color : ${(props) => props.theme.textColor};
}
a{
  text-decoration: none;
  color:inherit;
// 링크가 클릭되었을 때 너무 못생겨져서 부모로부터 상속받게 하여
// 색깔을 유지시켰다
}
  `;
  return (
    <>
      <GlobalStyle />
      {/* 이것이 reset이고 기본값을 제거하는 방법이다. */}

      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
      {/* developer tool */}
    </>
  );
}

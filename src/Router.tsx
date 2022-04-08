import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          {/* Router에게 URL이 변수값을 갖는 것을 말해주는 방식이다
          이제 할일은 coinId를 잡아내는 일이다. URL의 파라미터 부분을 잡아내고 싶을 때
          useParams 훅을 사용하기만 하면 된다.*/}
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;

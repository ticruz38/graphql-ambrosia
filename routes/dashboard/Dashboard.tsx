import * as React from 'react';
import * as mobx from 'mobx';
import * as moment from 'moment';
import { observer } from 'mobx-react';

//layout
import { layoutState } from 'routes/layout/Layout';

// Dashboard
import Timeline from './visuals/Timeline';
import OrderList from './visuals/OrderList';




class DashboardState {
  @mobx.observable filterBy: { payed: boolean, treated: boolean } = {
    payed: false,
    treated: false
  }
  @mobx.observable x: number = (this.current - this.today) / 10
  @mobx.observable orders: Order[] = [];
  @mobx.observable current: number = moment().unix();
  @mobx.observable today: number = moment().startOf('day').unix();
  secondPerDay = 24*60*60;

  onWheel = (event: WheelEvent ) => {
      event.preventDefault();
      event.stopPropagation();

      // we scrolled back to the previous day
      if (this.x <= 0 && (event.deltaX < 0 || event.deltaY < 0)) {
        //this.current -= secondPerDay;
        this.today -= this.secondPerDay;
        this.x = 8640;
      }
      // we scrolled forth to the next day
      if (this.x >= 8640 && (event.deltaX > 0 || event.deltaY > 0)) {
        //this.current += secondPerDay;
        this.today += this.secondPerDay;
        this.x = 0;
      }
      this.x += event.currentTarget["id"] === 'timeline' ? event.deltaX : event.deltaY;
      this.current = this.today + (this.x * 10);
  }
}

export const dashboardState = new DashboardState()


@observer
export default class Dashboard extends React.Component< any, any > {
  
  componentWillMount() {

  }

  render() {
    return (
      <div>
        <Timeline/>
        <OrderList/>
      </div>
    );
  }
}


// import 'component.scss'
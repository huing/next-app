import { action, configure, makeAutoObservable, observable, runInAction } from "mobx";

configure({ enforceActions: "observed" });

class Timer {
  constructor() {
    makeAutoObservable(this, {
      secondPassed: observable,
      increase: action,
      reset: action,
    });
  }
  secondPassed = 0;
  increase() {
    runInAction(() => {
      this.secondPassed += 1;
    });
  }
  reset() {
    runInAction(() => {
      this.secondPassed = 0;
    });
  }
}

export default new Timer();

import Engine from "../../api/engine/TS/_Engine";

export default class Monitor {
  engine: Engine;
  constructor(engine: Engine) {
    this.engine = engine;
  }

  private monitorData = async () => {
    const data = this.engine.handle();

    console.log(data);

    this.engine.insert(data);
  };

  public async start() {
    if (this.engine) {
      while (true) {
        await this.monitorData();

        // Wait for a specific interval before checking again (1 hour)
        // await new Promise(resolve => setTimeout(resolve, 1800000));
        // (.25 hour)
        await new Promise((resolve) => {
          setTimeout(resolve, 450000);
        });
      }
    } else {
      console.log("Please set an engine...");
    }
  }
}

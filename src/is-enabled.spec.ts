import * as chai from "chai";
import { isEnabled } from "./is-enabled";

const features = {
  FEATURE_1: true,
  FEATURE_2: false,
  FEATURE_3: false
};

class Stub {
  public calls: any[] = [];

  @isEnabled(features.FEATURE_1)
  public test1(...args: any[]) {
    this.calls.push(args);
  }

  @isEnabled(features.FEATURE_2)
  public test2(...args: any[]) {
    this.calls.push(args);
  }

  @isEnabled(features.FEATURE_3, "fallbackMethod")
  public test3(...args: any[]) {
    this.calls.push(args);
  }

  public fallbackMethod() {
    this.calls.push("fallback");
  }

}

describe("isEnabled", () => {

  it("executes a function if the feature is enabled", () => {
    const stub = new Stub();
    stub.test1("value1", 1);

    chai.expect(stub.calls[0]).to.deep.equal(["value1", 1]);
  });

  it("does not execute a function if the feature is disabled", () => {
    const stub = new Stub();
    stub.test2("arg1");

    chai.expect(stub.calls.length).to.equal(0);
  });

  it("executes a fallback method if given one", () => {
    const stub = new Stub();
    stub.test3("arg1");

    chai.expect(stub.calls[0]).to.equal("fallback");
  });

});

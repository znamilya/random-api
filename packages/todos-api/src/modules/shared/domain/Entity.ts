import { Guid } from "./Guid.js";

abstract class Entity<TProps> {
  public readonly id: string;
  protected props: TProps;

  protected constructor(props: TProps, id?: string) {
    this.props = props;
    this.id = id || new Guid().toValue();
  }
}

export { Entity };

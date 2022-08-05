import { IGood } from "../../frontendTypes";

export interface IMainProps {
  onCartAdd: (good: IGood) => void;
  goods: Array<IGood>;
}

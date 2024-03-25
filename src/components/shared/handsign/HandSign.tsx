import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MoveType } from "../../../server-types";
import {
  faGrinTongue,
  faHand,
  faHandFist,
  faHandScissors,
  faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";

type HandleAction = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
type HandSignParams = {
  sign: MoveType | "hidden" | "none";
  handleAction?: HandleAction;
  active?: boolean;
  disabled?: boolean;
};

export type ActionParams = {
  handleAction?: HandleAction;
  active?: boolean;
  disabled?: boolean;
};

const Paper = () => {
  return <FontAwesomeIcon size={"5x"} icon={faHand} />;
};
const Rock = () => {
  return <FontAwesomeIcon size={"5x"} icon={faHandFist} />;
};
const Scissors = () => {
  return <FontAwesomeIcon size={"5x"} icon={faHandScissors} />;
};
const Hidden = () => {
  return (
    <FontAwesomeIcon size={"5x"} icon={faGrinTongue} title="Made a move" />
  );
};
const None = () => {
  return (
    <FontAwesomeIcon
      icon={faHourglassStart}
      size={"5x"}
      // @ts-expect-error flip is not in the types
      flip
      title="Thinking..."
    />
  );
};

const HandSign = ({ sign, handleAction, active, disabled }: HandSignParams) => {
  const Sign = () => {
    switch (sign) {
      case "rock":
        return <Rock />;
      case "paper":
        return <Paper />;
      case "scissors":
        return <Scissors />;
      case "hidden":
        return <Hidden />;
      case "none":
        return <None />;
      default:
        console.error("Invalid sign", sign);
        return null;
    }
  };
  const capitalized = useMemo(
    () => sign.charAt(0).toUpperCase() + sign.slice(1),
    [sign]
  );
  const isDisabled = useMemo(() => {
    return disabled ? true : ["none", "hidden"].includes(sign) ? true : false;
  }, [disabled, sign]);
  return (
    <button
      type="button"
      className={`sign${active ? " active" : ""}`}
      {...(handleAction && { onClick: handleAction })}
      title={capitalized}
      disabled={isDisabled}
    >
      <Sign />
    </button>
  );
};
export default HandSign;

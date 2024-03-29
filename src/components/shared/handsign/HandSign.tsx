import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MoveType } from "../../../server-types";
import {
  faGrinTongue,
  faHand,
  faHandFist,
  faHandScissors,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

type HandleAction = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
type HandSignParams = {
  sign: MoveType | "hidden" | "none";
  handleAction?: HandleAction;
  active?: boolean;
  disabled?: boolean;
  size?: SizeProp;
  winner?: boolean;
  loser?: boolean;
};

export type ActionParams = {
  handleAction?: HandleAction;
  active?: boolean;
  disabled?: boolean;
};

type IconParams = {
  size?: SizeProp;
};

const Paper = ({ size }: IconParams) => {
  return <FontAwesomeIcon size={size ?? "5x"} icon={faHand} />;
};
const Rock = ({ size }: IconParams) => {
  return <FontAwesomeIcon size={size ?? "5x"} icon={faHandFist} />;
};
const Scissors = ({ size }: IconParams) => {
  return <FontAwesomeIcon size={size ?? "5x"} icon={faHandScissors} />;
};
const Hidden = ({ size }: IconParams) => {
  return (
    <FontAwesomeIcon
      size={size ?? "5x"}
      icon={faGrinTongue}
      title="Made a move"
    />
  );
};
const None = ({ size }: IconParams) => {
  const sizeStyle = useMemo(() => {
    const result = {
      width: "0",
      height: "0",
    };

    const parsedValue = parseInt(size as string);
    if (parsedValue) {
      result.width = `${parsedValue}em`;
      result.height = `${parsedValue}em`;
    } else {
      result.width = `5rem`;
      result.height = `5rem`;
    }
    return result;
  }, [size]);
  return (
    <img
      src="/playing-animation.gif"
      alt="playing-animation"
      style={sizeStyle}
      title="Thinking..."
    />
    // <FontAwesomeIcon
    //   icon={faHourglassStart}
    //   size={size ?? "5x"}
    //   // @ts-expect-error flip is not in the types
    //   flip
    //   title="Thinking..."
    // />
  );
};

const HandSign = ({
  sign,
  handleAction,
  active,
  disabled,
  size,
  winner,
  loser,
}: HandSignParams) => {
  const Sign = () => {
    switch (sign) {
      case "rock":
        return <Rock size={size} />;
      case "paper":
        return <Paper size={size} />;
      case "scissors":
        return <Scissors size={size} />;
      case "hidden":
        return <Hidden size={size} />;
      case "none":
        return <None size={size} />;
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
      className={`sign${active ? " active" : ""}${winner ? " winner" : ""}${
        loser ? " loser" : ""
      }`}
      {...(handleAction && { onClick: handleAction })}
      title={capitalized}
      disabled={isDisabled}
    >
      <Sign />
    </button>
  );
};
export default HandSign;

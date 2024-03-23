import {
  faHand,
  faHandFist,
  faHandScissors,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEmitter from "../../../hooks/useEmitter";

const HandSigns = () => {
  const { emitter } = useEmitter();

  const handleAction = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const sign = e.currentTarget.title.toLowerCase();
    emitter({
      event: "play",
      data: sign,
    });
  };
  return (
    <div className="hand-signs-container">
      <h2>Choose your sign</h2>
      <div className="hand-signs">
        <div className="sign" onClick={handleAction} title="Rock">
          <FontAwesomeIcon size={"5x"} icon={faHandFist} />
        </div>
        <div className="sign" onClick={handleAction} title="Scissors">
          <FontAwesomeIcon size={"5x"} icon={faHandScissors} />
        </div>
        <div className="sign" onClick={handleAction} title="Paper">
          <FontAwesomeIcon size={"5x"} icon={faHand} />
        </div>
      </div>
    </div>
  );
};
export default HandSigns;

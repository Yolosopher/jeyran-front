import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePunishPlayer from "../../../hooks/usePunishPlayer";
import Dialog from "../../shared/Dialog";
import { faBan, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import gameStore from "../../../store/gameStore";

const Blacklist = () => {
  const blacklist = gameStore((state) => state.gameInfo!.blacklist);
  const { unbanPlayer } = usePunishPlayer();

  return (
    <Dialog
      trigger={
        <button
          type="button"
          className="play-btn blacklist-button"
          title="Banned Players"
        >
          <FontAwesomeIcon icon={faBan} size="2x" />
        </button>
      }
      content={
        <div className="banned-players">
          {blacklist.map(({ id, username }) => {
            return (
              <div
                key={id}
                className="banned-players-item"
                onClick={() => unbanPlayer(id)}
              >
                <span>{username}</span>
                <div className="btn-punish unban" title="Unban Player">
                  <FontAwesomeIcon icon={faNotesMedical} size="1x" />
                </div>
              </div>
            );
          })}
        </div>
      }
    />
  );
};
export default Blacklist;

import { useDetectClickOutside } from "react-detect-click-outside";

import React from "react";

type OutsideClickProps = {
  onClose: () => void;
  children?: React.ReactNode;
  state?: boolean;
};

const OutsideClick = ({ onClose, children, state }: OutsideClickProps) => {
  const disableClick = !!state;
  const ref = useDetectClickOutside({
    onTriggered: onClose,
    allowAnyKey: true,
    disableClick,
  });
  return <span ref={ref}>{children ?? ""}</span>;
};

export default OutsideClick;

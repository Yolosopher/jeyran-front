import { useEffect, useMemo, useRef, useState } from "react";
import OutsideClick from "./OutsideClick";
import useRootFontSize from "../../hooks/useRootFontSize";

type DialogProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  contentFit?: boolean;
};
const Dialog = ({ content, trigger, contentFit }: DialogProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | string>("auto");
  const [triggerHeight, setTriggerHeight] = useState<number | string>("auto");
  const [toggled, setToggled] = useState<boolean>(false);
  const rootFontSize = useRootFontSize();

  const onTrigger = () => {
    setToggled((prevstate) => !prevstate);
  };
  const onClose = () => {
    console.log("running onclose");
    if (toggled) {
      setToggled(false);
    }
  };
  useEffect(() => {
    if (contentRef.current) {
      const elem = contentRef.current;
      setContentHeight(elem.scrollHeight);
    }
  }, [contentRef]);
  useEffect(() => {
    if (triggerRef.current) {
      const elem = triggerRef.current;
      setTriggerHeight(elem.scrollHeight);
    }
  }, [triggerRef]);

  const contentHeightInRem = useMemo(() => {
    if (typeof contentHeight === "number") {
      return contentHeight / rootFontSize;
    }
    return contentHeight;
  }, [rootFontSize, contentHeight]);

  const triggerHeightInRem = useMemo(() => {
    if (typeof triggerHeight === "number") {
      return triggerHeight / rootFontSize;
    }
    return triggerHeight;
  }, [rootFontSize, triggerHeight]);

  return (
    <OutsideClick onClose={onClose} state={!toggled}>
      <div
        className={`profile dialog ${toggled ? "toggled" : ""}`}
        style={
          {
            "--content-height": contentHeightInRem,
            "--trigger-height": triggerHeightInRem,
          } as React.CSSProperties
        }
      >
        <div className="dialog-trigger" onClick={onTrigger} ref={triggerRef}>
          {trigger}
        </div>
        <div
          className={`dialog-content ${contentFit ? "fit" : ""}`}
          ref={contentRef}
        >
          {content}
        </div>
      </div>
    </OutsideClick>
  );
};
export default Dialog;

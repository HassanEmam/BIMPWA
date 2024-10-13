import { useClickAway } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export type ContextMenuItem = {
  name: string;
  icon?: JSX.Element;
};
type ContextMenuProps = {
  items: ContextMenuItem[];
  x: number;
  y: number;
  show: boolean;
};

const ContextMenu = (props: ContextMenuProps) => {
  const { x, y, show } = props;
  const { items } = props;
  const [visible, setVisible] = useState(false);
  console.log(show);
  const ref = useClickAway(() => {
    setVisible(false);
  });

  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <div
      ref={ref}
      className={` ${
        visible ? "" : "hidden"
      } absolute bg-slate-900 text-white border border-gray-300 shadow-lg`}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <div className="p-2">Context Menu</div>
      <div className="p-2">
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer flex"
            >
              <div className="p-1 text-green-400">{item.icon && item.icon}</div>
              <div className="p-1 text-green-400 align-middle">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContextMenu;

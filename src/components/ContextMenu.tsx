import { useClickAway } from "react-use";
import { useRef } from "react";

export type ContextMenuItem = {
  name: string;
  icon?: JSX.Element;
  action?: () => void;
};
type ContextMenuProps = {
  items: ContextMenuItem[];
  x: number;
  y: number;
  show: boolean;
  setShow: (show: boolean) => void;
};

const ContextMenu = (props: ContextMenuProps) => {
  const { x, y, show, setShow } = props;
  const { items } = props;
  console.log(show);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShow(false);
  });

  return (
    <div
      ref={ref}
      className={` ${
        show ? "" : "hidden"
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
              onClick={() => {
                setShow(false);
                if (item.action) item.action();
              }}
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

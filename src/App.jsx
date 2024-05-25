import "./App.css";
import ArrowDown from "./assets/ArrowDown.svg?react";
import ArrowUp from "./assets/ArrowUp.svg?react";
import Chevron from "./assets/Chevron.svg?react";
import Ellipsis from "./assets/Ellipsis.svg?react";

const TITLE_TEMPLATE = (name) => `Количество пройденных тестов "${name}"`;
const components = [
  { key: "front", label: "Клиентская часть" },
  { key: "back", label: "Серверная часть" },
  { key: "db", label: "База данных" },
];
const instances = [
  { key: "dev", label: "dev" },
  { key: "test", label: "test" },
  { key: "prod", label: "prod" },
];

const stubs = {
  title: "OS Doors",
  dev: {
    front: 66,
    back: 100,
    db: 31,
  },
  test: {
    front: 60,
    back: 80,
    db: 31,
  },
  prod: {
    front: 66,
    back: 83,
    db: 31,
  },
  norm: 150,
};

function App() {
  const arrows = instances.slice(0, -1).map((i, index) => {
    const total1 = Object.values(stubs[i.key]).reduce(
      (acc, value) => acc + value
    );
    const total2 = Object.values(stubs[instances[index + 1].key]).reduce(
      (acc, value) => acc + value
    );
    const y1 = 330 - total1 * 1.3;
    const y2 = 330 - total2 * 1.3;

    const width = index === 0 || index === instances.length - 2 ? 130 : 120;
    const total = total2 - total1;

    return { y1, y2, width, total };
  });

  return (
    <div className="block">
      <div className="header">
        <h2 className="title">{TITLE_TEMPLATE(stubs.title)}</h2>
        <button
          type="button"
          className="button"
          aria-label="Дополнительная информация"
        >
          <Ellipsis />
        </button>
      </div>
      <div>
        <div className="graph">
          <div className="arrows">
            {arrows.map(({ y1, y2, width, total }, index) => {
              return (
                <div className="arrow" key={index}>
                  <svg width={width} height="330">
                    <line x1="0" y1="0" x2="0" y2={y1} />
                    <line x1="0" y1="0" x2="100%" y2="0" />
                    <line x1="100%" y1="0" x2="100%" y2={y2} />
                  </svg>
                  <Chevron style={{ top: y2 - 3 }} className="arr" />
                  <span
                    className={`tag ${
                      total > 0 ? "tag--good" : total < 0 ? "tag--bad" : ""
                    }`}
                  >
                    {total > 0 ? <ArrowUp /> : total < 0 ? <ArrowDown /> : null}
                    {total > 0 ? `+${total}` : total}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="columns">
            {instances.map((i) => {
              return (
                <div key={i.key}>
                  <div className="column">
                    {components.map((c) => (
                      <div
                        key={c.key}
                        className="column__component"
                        style={{ height: stubs[i.key][c.key] * 1.3 }}
                      >
                        {stubs[i.key][c.key]}
                      </div>
                    ))}
                  </div>
                  <h3 className="column__label">{i.label}</h3>
                </div>
              );
            })}

            <div>
              <div className="column">
                <div className="column__standard" style={{ height: 150 * 1.3 }}>
                  <span>150</span>
                </div>
              </div>
              <h3 className="column__label">норматив</h3>
            </div>
          </div>
        </div>
        <div className="legend">
          <ul>
            {components.map((c) => (
              <li key={c.key} className="legend__item">
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

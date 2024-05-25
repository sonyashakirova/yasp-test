import "./App.css";

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
  return (
    <div className="block">
      <div className="header">
        <h2 className="title">{TITLE_TEMPLATE(stubs.title)}</h2>
        <button>...</button>
      </div>
      <div>
        <div>
          <div className="arrows"></div>
          <div className="columns">
            {instances.map((i) => {
              const totalHeight =
                Object.values(stubs[i.key]).reduce(
                  (acc, value) => acc + value
                ) * 1.3;

              return (
                <div key={i.key}>
                  <svg width="80" height={330 - totalHeight}>
                    <line x1="40" y1="0" x2="40" y2="100%" />
                  </svg>
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

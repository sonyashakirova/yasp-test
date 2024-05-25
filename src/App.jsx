import { BarGraph } from "./widgets";
import "./App.css";

const titleTemplate = (name) => `Количество пройденных тестов "${name}"`;

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
    <div className="app">
      <BarGraph
        title={titleTemplate(stubs.title)}
        components={[
          { label: "Клиентская часть", key: "front" },
          { label: "Серверная часть", key: "back" },
          { label: "База данных", key: "db" },
        ]}
        instances={[
          { label: "dev", data: stubs.dev },
          { label: "test", data: stubs.test },
          { label: "prod", data: stubs.prod },
        ]}
        reference={{ label: "норматив", value: stubs.norm }}
      />
    </div>
  );
}

export default App;

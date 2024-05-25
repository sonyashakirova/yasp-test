import { useFetch } from "./hooks";
import { BarGraph } from "./widgets";
import "./App.css";

const titleTemplate = (name) => `Количество пройденных тестов "${name}"`;

function App() {
  const { data, isLoading, isError } = useFetch(
    "https://rcslabs.ru/ttrp1.json"
  );

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Failed to fetch data";
  }

  return (
    data && (
      <div className="app">
        <BarGraph
          title={titleTemplate(data.title)}
          components={[
            { label: "Клиентская часть", key: "front" },
            { label: "Серверная часть", key: "back" },
            { label: "База данных", key: "db" },
          ]}
          instances={[
            { label: "dev", data: data.dev },
            { label: "test", data: data.test },
            { label: "prod", data: data.prod },
          ]}
          reference={{ label: "норматив", value: data.norm }}
        />
      </div>
    )
  );
}

export default App;

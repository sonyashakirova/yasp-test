import { useFetch } from "./hooks";
import { BarGraph } from "./widgets";
import "./App.css";

const urls = [
  "https://rcslabs.ru/ttrp1.json",
  "https://rcslabs.ru/ttrp2.json",
  "https://rcslabs.ru/ttrp3.json",
  "https://rcslabs.ru/ttrp4.json",
  "https://rcslabs.ru/ttrp5.json",
];

function App() {
  const { data, isLoading } = useFetch(urls);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="app">
      {!!data.length &&
        data.map(
          (item, index) =>
            item && (
              <BarGraph
                key={index}
                title={`Количество пройденных тестов "${item.title}"`}
                components={[
                  { label: "Клиентская часть", key: "front" },
                  { label: "Серверная часть", key: "back" },
                  { label: "База данных", key: "db" },
                ]}
                instances={[
                  { label: "dev", data: item.dev },
                  { label: "test", data: item.test },
                  { label: "prod", data: item.prod },
                ]}
                reference={{ label: "норматив", value: item.norm }}
              />
            )
        )}
    </div>
  );
}

export default App;

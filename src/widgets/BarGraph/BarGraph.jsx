import { useMemo } from "react";
import PropTypes from "prop-types";
import ArrowDown from "../../assets/ArrowDown.svg?react";
import ArrowUp from "../../assets/ArrowUp.svg?react";
import Chevron from "../../assets/Chevron.svg?react";
import Ellipsis from "../../assets/Ellipsis.svg?react";
import "./BarGraph.css";

const sliceMinHeight = 4; // Минимальная высота слоя (показать, что данные вообще есть)
const barMaxHeight = 280; // Максимальная высота столбца
const referenceBarMaxHeight = 240; // Максимальная высота столбца "норматив"
const heightWithArrows = 327; // Высота всех столбцов вместе со стрелочками

export const BarGraph = ({ title, components, instances, reference }) => {
  /** Соотношение value-px в зависимости от самого высокого столбца */
  const ratio = useMemo(() => {
    const values = instances.map(({ data }) =>
      components.reduce((acc2, { key }) => acc2 + data[key], 0)
    );
    const max = Math.max(...values, reference.value);

    if (max === 0) return 1;
    if (max === reference.value) return referenceBarMaxHeight / max;
    else return barMaxHeight / max;
  }, [components, instances, reference]);

  /** Ширина, высота и значение сравнительных стрелочек */
  const arrowsData = useMemo(
    () =>
      instances.slice(0, -1).map(({ data }, index) => {
        const valuesA = Object.values(data);
        const valuesB = Object.values(instances[index + 1].data);

        const totalA = valuesA.reduce((acc, v) => acc + v);
        const totalB = valuesB.reduce((acc, v) => acc + v);
        const difference = totalB - totalA;

        const width = index === 0 || index === instances.length - 2 ? 130 : 120;
        const yA =
          heightWithArrows -
          valuesA.reduce((acc, v) => {
            return acc + Math.max(sliceMinHeight, v * ratio);
          }, 0);
        const yB =
          heightWithArrows -
          valuesB.reduce((acc, v) => {
            return acc + Math.max(sliceMinHeight, v * ratio);
          }, 0);

        return { width, yA, yB, difference };
      }),
    [ratio, instances]
  );

  const Header = () => (
    <div className="bar-graph__header">
      <h2 className="bar-graph__title">{title}</h2>
      <button
        type="button"
        className="bar-graph__button"
        aria-label="Дополнительная информация"
      >
        <Ellipsis />
      </button>
    </div>
  );

  const Arrows = () => (
    <div className="bar-graph__arrows">
      {arrowsData.map(({ width, yA, yB, difference }, index) => {
        return (
          <div className="bar-graph__arrow" key={index}>
            <svg width={width} height="330" className="bar-graph__line">
              <line x1="0" y1="0" x2="0" y2={yA} />
              <line x1="0" y1="0" x2="100%" y2="0" />
              <line x1="100%" y1="0" x2="100%" y2={yB} />
            </svg>
            <Chevron className="bar-graph__chevron" style={{ top: yB - 3 }} />
            <span
              className={`bar-graph__tag
                  ${difference > 0 && "bar-graph__tag--good"}
                  ${difference < 0 && "bar-graph__tag--bad"}`}
            >
              {difference > 0 && <ArrowUp />}
              {difference < 0 && <ArrowDown />}
              {difference > 0 ? `+${difference}` : difference}
            </span>
          </div>
        );
      })}
    </div>
  );

  const Column = (instance) => (
    <div>
      <div className="bar-graph__column">
        {components.map((component, index) => {
          const value = instance.data[component.key];
          const height = value * ratio;
          return (
            <div
              key={index}
              className="bar-graph__slice"
              style={{
                height:
                  height > 0 && height < sliceMinHeight
                    ? sliceMinHeight
                    : height,
              }}
            >
              {height < 16 ? "" : value}
            </div>
          );
        })}
      </div>
      <h3 className="bar-graph__label">{instance.label}</h3>
    </div>
  );

  const ReferenceBar = () =>
    reference && (
      <div>
        <div className="bar-graph__column">
          <div
            className="bar-graph__slice bar-graph__slice--norm"
            style={{ height: reference.value * ratio }}
          >
            <span>{reference.value}</span>
          </div>
        </div>
        <h3 className="bar-graph__label">{reference.label}</h3>
      </div>
    );

  const Legend = () => (
    <ul className="bar-graph__legend">
      {components.map((c) => (
        <li key={c.key}>{c.label}</li>
      ))}
    </ul>
  );

  return (
    <div className="bar-graph">
      <Header />
      <div className="bar-graph__body">
        <div className="bar-graph__inner">
          <Arrows />
          <div className="bar-graph__columns">
            {instances.map((instance, index) => (
              <Column key={index} {...instance} />
            ))}
            <ReferenceBar />
          </div>
        </div>
        <Legend />
      </div>
    </div>
  );
};

BarGraph.propTypes = {
  title: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  instances: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      data: PropTypes.object,
    })
  ).isRequired,
  reference: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
  }),
};

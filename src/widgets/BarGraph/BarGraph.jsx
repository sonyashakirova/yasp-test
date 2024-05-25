import { useMemo } from "react";
import PropTypes from "prop-types";
import ArrowDown from "../../assets/ArrowDown.svg?react";
import ArrowUp from "../../assets/ArrowUp.svg?react";
import Chevron from "../../assets/Chevron.svg?react";
import Ellipsis from "../../assets/Ellipsis.svg?react";
import "./BarGraph.css";

export const BarGraph = ({ title, components, instances, reference }) => {
  const arrowsData = useMemo(
    () =>
      instances.slice(0, -1).map(({ data }, index) => {
        const comparingData = instances[index + 1].data;

        const totalA = Object.values(data).reduce((acc, v) => acc + v);
        const totalB = Object.values(comparingData).reduce((acc, v) => acc + v);

        const heightA = 326 - totalA * 1.4;
        const heightB = 326 - totalB * 1.4;

        const width = index === 0 || index === instances.length - 2 ? 130 : 120;
        const difference = totalB - totalA;

        return { width, heightA, heightB, difference };
      }),
    [instances]
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
      {arrowsData.map(({ width, heightA, heightB, difference }, index) => {
        return (
          <div className="bar-graph__arrow" key={index}>
            <svg width={width} height="330" className="bar-graph__line">
              <line x1="0" y1="0" x2="0" y2={heightA} />
              <line x1="0" y1="0" x2="100%" y2="0" />
              <line x1="100%" y1="0" x2="100%" y2={heightB} />
            </svg>
            <Chevron
              className="bar-graph__chevron"
              style={{ top: heightB - 3 }}
            />
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
          return (
            <div
              key={index}
              className="bar-graph__slice"
              style={{ height: value * 1.4 }}
            >
              {value}
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
            style={{ height: reference.value * 1.3 }}
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

export const sliceMinHeight = 4; // Минимальная высота слоя (показать, что данные вообще есть)
export const barMaxHeight = 280; // Максимальная высота столбца
export const referenceBarMaxHeight = 240; // Максимальная высота столбца "норматив"
export const heightWithArrows = 327; // Высота всех столбцов вместе со стрелочками

export const getRatio = (instances, components, reference) => {
  const values = instances.map(({ data }) =>
    components.reduce((acc2, { key }) => acc2 + data[key], 0)
  );
  const max = Math.max(...values, reference.value);

  if (max === 0) return 1;
  if (max === reference.value) return referenceBarMaxHeight / max;
  else return barMaxHeight / max;
};

export const gatArrowsData = (instances, ratio) => {
  return instances.slice(0, -1).map(({ data }, index) => {
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
  });
};
